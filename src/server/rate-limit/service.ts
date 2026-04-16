import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import type { RateLimitPolicy } from "@/server/rate-limit/config";

type EnforceRateLimitInput = {
  key: string;
  scope: string;
  endpoint: string;
  policy: RateLimitPolicy;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

export class RateLimitExceededError extends Error {
  readonly status = 429;
  readonly limit: number;
  readonly remaining: number;
  readonly retryAfterSeconds: number;

  constructor(message: string, meta: Omit<RateLimitResult, "allowed">) {
    super(message);
    this.name = "RateLimitExceededError";
    this.limit = meta.limit;
    this.remaining = meta.remaining;
    this.retryAfterSeconds = meta.retryAfterSeconds;
  }
}

export class RateLimitStoreUnavailableError extends Error {
  readonly status = 503;

  constructor(message = "Rate limit store unavailable") {
    super(message);
    this.name = "RateLimitStoreUnavailableError";
  }
}

function secondsUntilWindowReset(windowMs: number) {
  return Math.max(1, Math.ceil(windowMs / 1000));
}

function isConnectivityError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return /can't reach database server/i.test(error.message);
  }

  if (error instanceof Error) {
    return /can't reach database server|connection|timeout|network/i.test(error.message);
  }

  return false;
}

function failOpenInDev(policy: RateLimitPolicy): RateLimitResult {
  return {
    allowed: true,
    limit: policy.maxRequests,
    remaining: policy.maxRequests,
    retryAfterSeconds: secondsUntilWindowReset(policy.windowMs),
  };
}

export async function enforceRateLimit(input: EnforceRateLimitInput): Promise<RateLimitResult> {
  try {
    const now = new Date();
    const windowStart = new Date(now.getTime() - input.policy.windowMs);
    const retryAfterSeconds = secondsUntilWindowReset(input.policy.windowMs);

    const eventsInWindow = await prisma.rateLimitEvent.count({
      where: {
        key: input.key,
        endpoint: input.endpoint,
        createdAt: {
          gte: windowStart,
        },
      },
    });

    if (eventsInWindow >= input.policy.maxRequests) {
      return {
        allowed: false,
        limit: input.policy.maxRequests,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    await prisma.rateLimitEvent.create({
      data: {
        key: input.key,
        scope: input.scope,
        endpoint: input.endpoint,
      },
    });

    const remaining = Math.max(0, input.policy.maxRequests - eventsInWindow - 1);

    if (Math.random() < 0.05) {
      await prisma.rateLimitEvent.deleteMany({
        where: {
          createdAt: {
            lt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
          },
        },
      });
    }

    return {
      allowed: true,
      limit: input.policy.maxRequests,
      remaining,
      retryAfterSeconds,
    };
  } catch (error) {
    if (!isConnectivityError(error)) {
      throw error;
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn("[rate-limit] store unavailable; fail-open in non-production mode");
      return failOpenInDev(input.policy);
    }

    throw new RateLimitStoreUnavailableError();
  }
}

export async function requireRateLimit(input: EnforceRateLimitInput) {
  const result = await enforceRateLimit(input);

  if (!result.allowed) {
    throw new RateLimitExceededError("Too many requests", {
      limit: result.limit,
      remaining: result.remaining,
      retryAfterSeconds: result.retryAfterSeconds,
    });
  }

  return result;
}
