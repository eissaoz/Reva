import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { requireAccountContext, toErrorResponse } from "@/server/auth/context";
import { advanceOnboardingStatus, getOnboardingSnapshot, validateBusinessName, validateLocationName } from "@/server/onboarding/service";
import { rateLimitPolicies } from "@/server/rate-limit/config";
import { requireRateLimit } from "@/server/rate-limit/service";

export const dynamic = "force-dynamic";

type StartPayload = {
  businessName?: unknown;
  locationName?: unknown;
};

export async function POST(request: Request) {
  try {
    const context = await requireAccountContext();
    const rateLimit = await requireRateLimit({
      key: `user:${context.appUserId}`,
      scope: "user",
      endpoint: "onboarding:start",
      policy: rateLimitPolicies.onboardingWrite,
    });

    const body = (await request.json()) as StartPayload;
    const businessName = validateBusinessName(body.businessName);
    const locationName = validateLocationName(body.locationName);

    if (!businessName || !locationName) {
      return NextResponse.json(
        { error: "Valid businessName and locationName are required." },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: {
          id: context.accountId,
        },
        select: {
          id: true,
          onboardingStatus: true,
        },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      await tx.account.update({
        where: {
          id: context.accountId,
        },
        data: {
          businessName,
          onboardingStatus: advanceOnboardingStatus(account.onboardingStatus, "PROFILE_COMPLETED"),
        },
      });

      await tx.location.update({
        where: {
          accountId: context.accountId,
        },
        data: {
          name: locationName,
        },
      });
    });

    const snapshot = await getOnboardingSnapshot(context.accountId);

    if (!snapshot) {
      return NextResponse.json({ error: "Onboarding context not found" }, { status: 404 });
    }

    return NextResponse.json({
      onboarding: snapshot,
      statusHint: {
        nextStep: snapshot.nextStep,
      },
      rateLimit: {
        limit: rateLimit.limit,
        remaining: rateLimit.remaining,
      },
    });
  } catch (error) {
    const failure = toErrorResponse(error);
    const status = failure.message === "Account not found" ? 404 : failure.status;

    return NextResponse.json(
      {
        error: status === 404 ? "Onboarding context not found" : failure.message,
        retryAfterSeconds: failure.retryAfterSeconds,
        limit: failure.limit,
        remaining: failure.remaining,
      },
      { status },
    );
  }
}
