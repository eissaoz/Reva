"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { routes } from "@/lib/routes";

type SettingsSectionKey =
  | "business-profile"
  | "location"
  | "business-links"
  | "rewards"
  | "qr-assets";

type OnboardingData = {
  businessName: string;
  locationName: string;
  googleBusinessLink: string | null;
  googleReviewLink: string | null;
  googlePlaceName: string | null;
  googleFormattedAddress: string | null;
  googleRating: number | null;
  googleReviewCount: number | null;
};

const sectionTabs: Array<{ key: SettingsSectionKey; label: string }> = [
  { key: "business-profile", label: "Business Profile" },
  { key: "location", label: "Location" },
  { key: "business-links", label: "Business Links" },
  { key: "rewards", label: "Rewards Program" },
  { key: "qr-assets", label: "QR Assets" },
];

function getActiveSection(value: string | null): SettingsSectionKey {
  return sectionTabs.some((tab) => tab.key === value)
    ? (value as SettingsSectionKey)
    : "business-profile";
}

function BusinessProfileSection({ onboarding }: { onboarding: OnboardingData | null }) {
  return (
    <section className="veil-card p-6">
      <h2 className="font-headline text-2xl font-bold tracking-tight">Business Profile</h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">Core account details for your business workspace.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="veil-label" htmlFor="businessName">Business Name (locked)</label>
          <input
            id="businessName"
            className="veil-input cursor-not-allowed opacity-80"
            value={onboarding?.businessName ?? "-"}
            readOnly
            aria-readonly
          />
        </div>
        <div>
          <label className="veil-label" htmlFor="businessEmail">Business Email</label>
          <input id="businessEmail" type="email" className="veil-input" defaultValue="owner@spiceroute.test" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button className="veil-btn-primary px-4 py-2 text-sm" type="button">Save Profile Changes</button>
        <button className="veil-btn-ghost px-4 py-2 text-sm" type="button">Change Password</button>
      </div>

      <div className="mt-8 rounded-xl border border-[var(--danger)]/40 bg-[var(--danger-bg)]/45 p-4">
        <p className="text-sm font-semibold text-[var(--danger)]">Danger Zone</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">Delete account permanently. This action cannot be undone.</p>
        <button className="mt-3 rounded-md border border-[var(--danger)] px-3 py-2 text-xs font-bold text-[var(--danger)]" type="button">
          Delete Account
        </button>
      </div>
    </section>
  );
}

function LocationSection({ onboarding }: { onboarding: OnboardingData | null }) {
  return (
    <section className="veil-card p-6">
      <h2 className="font-headline text-2xl font-bold tracking-tight">Location</h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">Primary business location linked to your onboarding setup.</p>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
        <div className="relative h-52 overflow-hidden rounded-lg border border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(196,165,53,0.25),transparent_42%),radial-gradient(circle_at_75%_75%,rgba(196,165,53,0.2),transparent_38%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <span className="material-symbols-outlined text-4xl text-[var(--gold)]">location_on</span>
            <p className="text-sm font-semibold">{onboarding?.locationName ?? "Main Location"}</p>
            <p className="text-xs text-[var(--text-secondary)]">{onboarding?.googleFormattedAddress ?? "Address pending Google resolution"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessLinksSection({ onboarding }: { onboarding: OnboardingData | null }) {
  return (
    <section className="veil-card p-6">
      <h2 className="font-headline text-2xl font-bold tracking-tight">Business Links</h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">Links collected from onboarding and used in review routing.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="veil-label" htmlFor="googleBusiness">Google Business Link</label>
          <input id="googleBusiness" className="veil-input" value={onboarding?.googleBusinessLink ?? "Not linked yet"} readOnly />
        </div>
        <div>
          <label className="veil-label" htmlFor="googleReview">Google Review Link</label>
          <input id="googleReview" className="veil-input" value={onboarding?.googleReviewLink ?? "Not available yet"} readOnly />
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-xs text-[var(--text-secondary)]">
        <p>Google Place: {onboarding?.googlePlaceName ?? "Pending resolution"}</p>
        <p>
          Rating: {onboarding?.googleRating !== null && onboarding?.googleRating !== undefined ? onboarding.googleRating.toFixed(1) : "-"}
          {onboarding?.googleReviewCount !== null && onboarding?.googleReviewCount !== undefined
            ? ` (${onboarding.googleReviewCount} reviews)`
            : ""}
        </p>
      </div>

      <div className="mt-3 text-xs text-[var(--text-secondary)]">These values come from onboarding and Google resolution.</div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button className="veil-btn-ghost px-4 py-2 text-sm" type="button">Copy Links</button>
      </div>
    </section>
  );
}

function RewardsSection() {
  return (
    <section className="veil-card p-6">
      <h2 className="font-headline text-2xl font-bold tracking-tight">Rewards Program</h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">Control whether happy customers see an optional reward after the Google review prompt.</p>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
        <label className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Enable rewards for 4 to 5 star customers</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">If enabled, customers can see an offer code after they complete the happy path.</p>
          </div>
          <input type="checkbox" defaultChecked className="mt-1 h-4 w-4" />
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="veil-label" htmlFor="rewardCode">Reward Code</label>
          <input id="rewardCode" className="veil-input" defaultValue="REVA10" />
        </div>
        <div>
          <label className="veil-label" htmlFor="rewardType">Reward Type</label>
          <select id="rewardType" className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" defaultValue="percent">
            <option value="percent">Percentage discount</option>
            <option value="fixed">Fixed amount off</option>
            <option value="text">Text-only offer</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="veil-label" htmlFor="rewardDetails">Offer Details</label>
        <textarea
          id="rewardDetails"
          rows={3}
          className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm"
          defaultValue="10% off your next visit. Valid for 30 days."
        />
      </div>

      <div className="mt-6 rounded-xl border border-[var(--gold)] bg-[var(--black)] p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--gold)]">Customer preview</p>
        <p className="mt-2 text-2xl font-black tracking-[0.15em] text-[var(--gold)]">REVA10</p>
        <p className="mt-1 text-xs text-[rgba(255,255,255,0.65)]">10% off your next visit. Valid for 30 days.</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button className="veil-btn-ghost px-4 py-2 text-sm" type="button">Disable rewards</button>
        <button className="veil-btn-primary px-4 py-2 text-sm" type="button">Save rewards settings</button>
      </div>
    </section>
  );
}

function QrAssetsSection() {
  return (
    <section className="veil-card p-6">
      <h2 className="font-headline text-2xl font-bold tracking-tight">QR Assets</h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">Generate and download printable QR assets for your location.</p>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
        <p className="text-sm font-semibold">Current status</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">No QR generated yet for this business location.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="veil-btn-primary px-4 py-2 text-sm" type="button">Generate QR Code</button>
          <button className="veil-btn-ghost px-4 py-2 text-sm" type="button">Download Latest QR</button>
        </div>

        <p className="mt-3 text-xs text-[var(--text-muted)]">Download button becomes active once a QR code is generated.</p>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-xs text-[var(--text-secondary)]">
        Billing stays available at <Link href={routes.billing} className="font-semibold text-[var(--text-primary)] underline">/billing</Link>.
      </div>
    </section>
  );
}

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const activeSection = getActiveSection(searchParams.get("section"));
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const run = async () => {
      const response = await fetch("/api/onboarding/status", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as { onboarding: OnboardingData };
      setOnboarding(payload.onboarding);
    };

    void run();
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-5xl font-extrabold tracking-tight">System Settings</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Manage your business profile, links, and integrations.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="veil-card p-2">
            {sectionTabs.map((tab) => {
              const active = tab.key === activeSection;
              return (
                <Link
                  key={tab.key}
                  href={`${routes.settings}?section=${tab.key}`}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                    active ? "bg-[var(--bg)] font-semibold" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </aside>

        <div className="space-y-6 lg:col-span-9">
          {activeSection === "business-profile" ? <BusinessProfileSection onboarding={onboarding} /> : null}
          {activeSection === "location" ? <LocationSection onboarding={onboarding} /> : null}
          {activeSection === "business-links" ? <BusinessLinksSection onboarding={onboarding} /> : null}
          {activeSection === "rewards" ? <RewardsSection /> : null}
          {activeSection === "qr-assets" ? <QrAssetsSection /> : null}
        </div>
      </section>
    </div>
  );
}
