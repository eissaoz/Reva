import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { authServer } from "@/server/auth/neon-auth";
import { RateLimitExceededError, RateLimitStoreUnavailableError } from "@/server/rate-limit/service";

export class AuthContextError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthContextError";
    this.status = status;
  }
}

export type AccountContext = {
  neonAuthUserId: string;
  email: string;
  appUserId: string;
  accountId: string;
};

async function resolveAppUser(neonAuthUserId: string) {
  return prisma.user.findUnique({
    where: {
      neonAuthUserId,
    },
    select: {
      id: true,
      accountId: true,
      email: true,
    },
  });
}

export async function getOptionalAccountContext(): Promise<AccountContext | null> {
  const { data: session } = await authServer.getSession();
  const sessionUser = session?.user;

  if (!sessionUser?.id || !sessionUser?.email) {
    return null;
  }

  const appUser = await resolveAppUser(sessionUser.id);

  if (!appUser) {
    return null;
  }

  return {
    neonAuthUserId: sessionUser.id,
    email: appUser.email,
    appUserId: appUser.id,
    accountId: appUser.accountId,
  };
}

export async function requireAccountContext(): Promise<AccountContext> {
  const { data: session } = await authServer.getSession();
  const sessionUser = session?.user;

  if (!sessionUser?.id || !sessionUser?.email) {
    throw new AuthContextError("Authentication required", 401);
  }

  const appUser = await resolveAppUser(sessionUser.id);

  if (!appUser) {
    throw new AuthContextError("Authenticated user is not provisioned", 403);
  }

  return {
    neonAuthUserId: sessionUser.id,
    email: appUser.email,
    appUserId: appUser.id,
    accountId: appUser.accountId,
  };
}

export function toErrorResponse(error: unknown): {
  status: number;
  message: string;
  retryAfterSeconds?: number;
  limit?: number;
  remaining?: number;
} {
  if (error instanceof AuthContextError) {
    return {
      status: error.status,
      message: error.message,
    };
  }

  if (error instanceof RateLimitExceededError) {
    return {
      status: error.status,
      message: error.message,
      retryAfterSeconds: error.retryAfterSeconds,
      limit: error.limit,
      remaining: error.remaining,
    };
  }

  if (error instanceof RateLimitStoreUnavailableError) {
    return {
      status: error.status,
      message: error.message,
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      status: 500,
      message: "Database error",
    };
  }

  return {
    status: 500,
    message: "Internal server error",
  };
}
