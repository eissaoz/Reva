import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { requireAccountContext, toErrorResponse } from "@/server/auth/context";
import { advanceOnboardingStatus, getOnboardingSnapshot, normalizeGoogleBusinessLink } from "@/server/onboarding/service";
import {
  GooglePlaceProviderError,
  GooglePlaceQuotaError,
  GooglePlaceValidationError,
  resolveGooglePlaceFromLink,
} from "@/server/google-places/service";
import { rateLimitPolicies } from "@/server/rate-limit/config";
import { requireRateLimit } from "@/server/rate-limit/service";

export const dynamic = "force-dynamic";

type LinkPayload = {
  googleBusinessLink?: unknown;
};

export async function POST(request: Request) {
  try {
    const context = await requireAccountContext();
    const rateLimit = await requireRateLimit({
      key: `user:${context.appUserId}`,
      scope: "user",
      endpoint: "onboarding:google-link",
      policy: rateLimitPolicies.onboardingWrite,
    });

    const body = (await request.json()) as LinkPayload;
    const googleBusinessLink = normalizeGoogleBusinessLink(body.googleBusinessLink);

    if (!googleBusinessLink) {
      return NextResponse.json(
        { error: "A valid Google business link is required." },
        { status: 400 },
      );
    }

    const resolvedPlace = await resolveGooglePlaceFromLink(googleBusinessLink);

    await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: {
          id: context.accountId,
        },
        select: {
          onboardingStatus: true,
        },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      await tx.location.update({
        where: {
          accountId: context.accountId,
        },
        data: {
          googleBusinessLink: resolvedPlace.businessLink,
          googleReviewLink: resolvedPlace.reviewLink,
          googlePlaceId: resolvedPlace.placeId,
          googlePlaceName: resolvedPlace.placeName,
          googleFormattedAddress: resolvedPlace.formattedAddress,
          googleRating: resolvedPlace.rating,
          googleReviewCount: resolvedPlace.reviewCount,
        },
      });

      await tx.account.update({
        where: {
          id: context.accountId,
        },
        data: {
          onboardingStatus: advanceOnboardingStatus(account.onboardingStatus, "GOOGLE_LINKED"),
        },
      });
    });

    const snapshot = await getOnboardingSnapshot(context.accountId);

    if (!snapshot) {
      return NextResponse.json({ error: "Onboarding context not found" }, { status: 404 });
    }

    return NextResponse.json({
      onboarding: snapshot,
      googlePlace: {
        placeId: resolvedPlace.placeId,
        placeName: resolvedPlace.placeName,
        formattedAddress: resolvedPlace.formattedAddress,
        rating: resolvedPlace.rating,
        reviewCount: resolvedPlace.reviewCount,
        reviewLink: resolvedPlace.reviewLink,
      },
      statusHint: {
        nextStep: snapshot.nextStep,
      },
      rateLimit: {
        limit: rateLimit.limit,
        remaining: rateLimit.remaining,
      },
    });
  } catch (error) {
    if (error instanceof GooglePlaceValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof GooglePlaceQuotaError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof GooglePlaceProviderError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

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
