import { NextResponse } from "next/server";
import { requireAccountContext, toErrorResponse } from "@/server/auth/context";
import { getOnboardingSnapshot } from "@/server/onboarding/service";
import { rateLimitPolicies } from "@/server/rate-limit/config";
import { requireRateLimit } from "@/server/rate-limit/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const context = await requireAccountContext();
    const rateLimit = await requireRateLimit({
      key: `user:${context.appUserId}`,
      scope: "user",
      endpoint: "onboarding:status",
      policy: rateLimitPolicies.privateRead,
    });

    const snapshot = await getOnboardingSnapshot(context.accountId);

    if (!snapshot) {
      return NextResponse.json({ error: "Onboarding context not found" }, { status: 404 });
    }

    return NextResponse.json({
      onboarding: snapshot,
      rateLimit: {
        limit: rateLimit.limit,
        remaining: rateLimit.remaining,
      },
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
