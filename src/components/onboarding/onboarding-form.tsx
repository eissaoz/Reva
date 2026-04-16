"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

export type OnboardingStatusView = {
  status: "STARTED" | "PROFILE_COMPLETED" | "GOOGLE_LINKED" | "QR_READY" | "COMPLETED";
  businessName: string;
  locationName: string;
  googleBusinessLink: string | null;
  googleReviewLink: string | null;
  googlePlaceName: string | null;
  googleFormattedAddress: string | null;
  googleRating: number | null;
  googleReviewCount: number | null;
  completedSteps: Array<"profile" | "google_link">;
  missingFields: Array<"businessName" | "locationName" | "googleBusinessLink">;
  nextStep: "profile" | "google_link" | "ready_for_qr";
};

type ApiError = {
  error?: string;
  retryAfterSeconds?: number;
};

type OnboardingFormProps = {
  initialOnboarding: OnboardingStatusView;
};

export function OnboardingForm({ initialOnboarding }: OnboardingFormProps) {
  const [onboarding, setOnboarding] = useState<OnboardingStatusView>(initialOnboarding);
  const [businessName, setBusinessName] = useState(initialOnboarding.businessName);
  const [locationName, setLocationName] = useState(initialOnboarding.locationName);
  const [googleBusinessLink, setGoogleBusinessLink] = useState(initialOnboarding.googleBusinessLink ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingGoogle, setSavingGoogle] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileError(null);
    setSavingProfile(true);

    const response = await fetch("/api/onboarding/start", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        businessName,
        locationName,
      }),
    });

    const payload = (await response.json().catch(() => null)) as { onboarding?: OnboardingStatusView } & ApiError;
    if (!response.ok || !payload?.onboarding) {
      const retry = payload?.retryAfterSeconds ? ` Retry in ${payload.retryAfterSeconds}s.` : "";
      setProfileError(`${payload?.error ?? "Failed to save profile."}${retry}`);
      setSavingProfile(false);
      return;
    }

    setOnboarding(payload.onboarding);
    setBusinessName(payload.onboarding.businessName);
    setLocationName(payload.onboarding.locationName);
    setSavingProfile(false);
  };

  const handleGoogleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGoogleError(null);
    setSavingGoogle(true);

    const response = await fetch("/api/onboarding/google-link", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        googleBusinessLink,
      }),
    });

    const payload = (await response.json().catch(() => null)) as { onboarding?: OnboardingStatusView } & ApiError;
    if (!response.ok || !payload?.onboarding) {
      const retry = payload?.retryAfterSeconds ? ` Retry in ${payload.retryAfterSeconds}s.` : "";
      setGoogleError(`${payload?.error ?? "Failed to save Google link."}${retry}`);
      setSavingGoogle(false);
      return;
    }

    setOnboarding(payload.onboarding);
    setGoogleBusinessLink(payload.onboarding.googleBusinessLink ?? "");
    setSavingGoogle(false);
  };

  return (
    <div className="space-y-6">
      <section className="veil-card p-6">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Onboarding</p>
        <h1 className="mt-2 font-headline text-3xl font-extrabold tracking-tight">Set up your business profile</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Complete profile and Google link to finish MVP onboarding.</p>
      </section>

      <section className="veil-card p-6">
        <h2 className="font-headline text-xl font-bold tracking-tight">1. Business and location</h2>
        <form className="mt-4 space-y-4" onSubmit={handleProfileSubmit}>
          <div>
            <label htmlFor="businessName" className="veil-label">Business Name</label>
            <input
              id="businessName"
              className="veil-input"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="locationName" className="veil-label">Location Name</label>
            <input
              id="locationName"
              className="veil-input"
              value={locationName}
              onChange={(event) => setLocationName(event.target.value)}
              required
            />
          </div>
          {profileError ? <p className="text-xs text-[var(--danger)]">{profileError}</p> : null}
          <button type="submit" className="veil-btn-primary px-4 py-2 text-sm" disabled={savingProfile}>
            {savingProfile ? "Saving..." : "Save profile"}
          </button>
        </form>
      </section>

      <section className="veil-card p-6">
        <h2 className="font-headline text-xl font-bold tracking-tight">2. Google business link</h2>
        <form className="mt-4 space-y-4" onSubmit={handleGoogleSubmit}>
          <div>
            <label htmlFor="googleLink" className="veil-label">Google Business Link</label>
            <input
              id="googleLink"
              className="veil-input"
              value={googleBusinessLink}
              onChange={(event) => setGoogleBusinessLink(event.target.value)}
              placeholder="https://maps.google.com/..."
              required
            />
          </div>
          {googleError ? <p className="text-xs text-[var(--danger)]">{googleError}</p> : null}
          <button type="submit" className="veil-btn-primary px-4 py-2 text-sm" disabled={savingGoogle}>
            {savingGoogle ? "Saving..." : "Save Google link"}
          </button>
        </form>
      </section>

      {onboarding.googlePlaceName || onboarding.googleFormattedAddress || onboarding.googleReviewLink ? (
        <section className="veil-card p-6">
          <h2 className="font-headline text-xl font-bold tracking-tight">Resolved from Google</h2>
          <div className="mt-4 space-y-2 text-sm">
            <p><span className="text-[var(--text-muted)]">Place:</span> {onboarding.googlePlaceName ?? "-"}</p>
            <p><span className="text-[var(--text-muted)]">Address:</span> {onboarding.googleFormattedAddress ?? "-"}</p>
            <p>
              <span className="text-[var(--text-muted)]">Rating:</span>{" "}
              {onboarding.googleRating !== null ? onboarding.googleRating.toFixed(1) : "-"}
              {onboarding.googleReviewCount !== null ? ` (${onboarding.googleReviewCount} reviews)` : ""}
            </p>
            <p className="break-all"><span className="text-[var(--text-muted)]">Review Link:</span> {onboarding.googleReviewLink ?? "-"}</p>
          </div>
        </section>
      ) : null}

      {onboarding.nextStep === "ready_for_qr" ? (
        <section className="veil-card p-6">
          <h2 className="font-headline text-xl font-bold tracking-tight">Onboarding complete</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Setup is complete. Continue to your dashboard.</p>
          <div className="mt-4">
            <Link href={routes.dashboard} className="veil-btn-primary inline-block px-4 py-2 text-sm">
              Continue to dashboard
            </Link>
          </div>
        </section>
      ) : (
        <section className="veil-card p-6">
          <p className="text-xs text-[var(--text-muted)]">
            Need to return later? You can continue setup from this page until onboarding is complete.
          </p>
          <div className="mt-4">
            <Link href={routes.dashboard} className="veil-btn-ghost inline-block px-4 py-2 text-sm">
              Back to dashboard
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
