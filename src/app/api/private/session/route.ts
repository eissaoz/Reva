import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { requireAccountContext, toErrorResponse } from "@/server/auth/context";
import { rateLimitPolicies } from "@/server/rate-limit/config";
import { requireRateLimit } from "@/server/rate-limit/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const context = await requireAccountContext();
    await requireRateLimit({
      key: `user:${context.appUserId}`,
      scope: "user",
      endpoint: "private:session",
      policy: rateLimitPolicies.privateRead,
    });

    const account = await prisma.account.findUnique({
      where: {
        id: context.accountId,
      },
      select: {
        id: true,
        businessName: true,
        onboardingStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        appUserId: context.appUserId,
        neonAuthUserId: context.neonAuthUserId,
        email: context.email,
      },
      account,
    });
  } catch (error) {
    const failure = toErrorResponse(error);
    return NextResponse.json(
      {
        error: failure.message,
        retryAfterSeconds: failure.retryAfterSeconds,
        limit: failure.limit,
        remaining: failure.remaining,
      },
      { status: failure.status },
    );
  }
}
