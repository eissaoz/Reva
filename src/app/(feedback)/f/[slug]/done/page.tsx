"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FeedbackShell } from "@/components/feedback/feedback-shell";
import { routes } from "@/lib/routes";

export default function FeedbackDonePage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = useMemo(() => {
    const raw = params?.slug;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params?.slug]);

  const kind = searchParams.get("kind") === "complaint" ? "complaint" : "review";
  const reward = searchParams.get("reward") === "1";

  return (
    <FeedbackShell
      step={3}
      label="Flow complete. Thank you for sharing feedback."
      locationName="Spice Route Kitchen"
      backHref={slug ? routes.feedback(slug) : undefined}
    >
      <h1 className="feedback-title">All set.</h1>
      <p className="feedback-copy">
        {kind === "complaint"
          ? "Your feedback has been sent privately to the business manager."
          : "Thanks for helping this business with your public review support."}
      </p>

      <div className={`feedback-flag ${kind === "complaint" ? "feedback-flag-bad" : "feedback-flag-good"}`}>
        {kind === "complaint"
          ? "The team can now review your complaint and follow up directly if you shared contact details."
          : "Your rating contributes to better online trust and helps future customers decide with confidence."}
      </div>

      {reward ? (
        <article className="feedback-card border-[var(--gold)] bg-[var(--black)] text-[var(--gold)]">
          <p className="feedback-muted text-[var(--gold)]">Reward active</p>
          <p className="mt-2 text-center text-3xl font-bold tracking-[0.16em]">REVA10</p>
          <p className="mt-2 text-center text-xs text-[rgba(255,255,255,0.65)]">Show this at the counter on your next visit.</p>
        </article>
      ) : null}

      <div className="mt-auto">
        <Link href={slug ? routes.feedback(slug) : "/"} className="feedback-btn feedback-btn-primary block text-center">
          Restart flow
        </Link>
      </div>
    </FeedbackShell>
  );
}
