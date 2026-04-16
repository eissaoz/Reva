import type { OnboardingStatus } from "@prisma/client";
import { prisma } from "@/server/db/prisma";

const statusRank: Record<OnboardingStatus, number> = {
  STARTED: 0,
  PROFILE_COMPLETED: 1,
  GOOGLE_LINKED: 2,
  QR_READY: 3,
  COMPLETED: 4,
};

const allowedGoogleHosts = ["google.com", "maps.google.com", "maps.app.goo.gl", "g.page"];

export type OnboardingSnapshot = {
  status: OnboardingStatus;
  businessName: string;
  locationName: string;
  googleBusinessLink: string | null;
  completedSteps: Array<"profile" | "google_link">;
  missingFields: Array<"businessName" | "locationName" | "googleBusinessLink">;
  nextStep: "profile" | "google_link" | "ready_for_qr";
};

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function validateBusinessName(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = normalizeName(value);
  if (!normalized || normalized.length > 120) {
    return null;
  }

  return normalized;
}

export function validateLocationName(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = normalizeName(value);
  if (!normalized || normalized.length > 120) {
    return null;
  }

  return normalized;
}

export function normalizeGoogleBusinessLink(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    const hostname = parsed.hostname.toLowerCase();
    const allowed = allowedGoogleHosts.some((host) => hostname === host || hostname.endsWith(`.${host}`));
    if (!allowed) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export function advanceOnboardingStatus(current: OnboardingStatus, target: OnboardingStatus): OnboardingStatus {
  return statusRank[target] > statusRank[current] ? target : current;
}

export async function getOnboardingSnapshot(accountId: string): Promise<OnboardingSnapshot | null> {
  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
    select: {
      onboardingStatus: true,
      businessName: true,
      locations: {
        select: {
          name: true,
          googleBusinessLink: true,
        },
        take: 1,
      },
    },
  });

  if (!account || account.locations.length === 0) {
    return null;
  }

  const location = account.locations[0];
  const missingFields: OnboardingSnapshot["missingFields"] = [];

  if (!account.businessName.trim()) {
    missingFields.push("businessName");
  }
  if (!location.name.trim()) {
    missingFields.push("locationName");
  }
  if (!location.googleBusinessLink?.trim()) {
    missingFields.push("googleBusinessLink");
  }

  const completedSteps: OnboardingSnapshot["completedSteps"] = [];
  if (!missingFields.includes("businessName") && !missingFields.includes("locationName")) {
    completedSteps.push("profile");
  }
  if (!missingFields.includes("googleBusinessLink")) {
    completedSteps.push("google_link");
  }

  const nextStep: OnboardingSnapshot["nextStep"] = missingFields.includes("businessName") || missingFields.includes("locationName")
    ? "profile"
    : missingFields.includes("googleBusinessLink")
      ? "google_link"
      : "ready_for_qr";

  return {
    status: account.onboardingStatus,
    businessName: account.businessName,
    locationName: location.name,
    googleBusinessLink: location.googleBusinessLink ?? null,
    completedSteps,
    missingFields,
    nextStep,
  };
}
