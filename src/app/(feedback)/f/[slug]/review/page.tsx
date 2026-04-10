"use client";

import { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FeedbackShell } from "@/components/feedback/feedback-shell";
import { routes } from "@/lib/routes";

const GOOGLE_REVIEW_URL = "https://g.page/r/Cm.../review";

export default function ReviewPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = useMemo(() => {
    const raw = params?.slug;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params?.slug]);

  const rating = searchParams.get("rating") ?? "5";
  const rewardsEnabled = searchParams.get("reward") !== "0";

  return (
    <FeedbackShell
      step={2}
      label="Happy path. Prompting public Google review."
      locationName="Spice Route Kitchen"
      backHref={slug ? routes.feedback(slug) : undefined}
    >
      <h1 className="feedback-title">Thank you so much.</h1>
      <p className="feedback-copy">You rated {rating} stars. If you have a minute, a Google review helps this business a lot.</p>

      <div className="feedback-flag feedback-flag-good">
        4 to 5 star customers are guided to review publicly. This helps improve search visibility and trust.
      </div>

      <article className="feedback-card">
        <p className="feedback-main">Spice Route Kitchen</p>
        <p className="feedback-sub">Google rating 4.3 - 147 reviews</p>
      </article>

      {rewardsEnabled ? (
        <article className="feedback-card border-[var(--gold)] bg-[var(--black)] text-[var(--gold)]">
          <p className="feedback-muted text-[var(--gold)]">Reward enabled by business</p>
          <p className="mt-2 text-center text-3xl font-bold tracking-[0.16em]">REVA10</p>
          <p className="mt-2 text-center text-xs text-[rgba(255,255,255,0.65)]">10% off next visit after leaving a review.</p>
        </article>
      ) : null}

      <div className="mt-auto">
        <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="feedback-btn feedback-btn-primary block text-center">
          Open Google reviews
        </a>
        <button
          type="button"
          className="feedback-btn feedback-btn-secondary"
          onClick={() => slug && router.push(routes.feedbackDone(slug, "review", rewardsEnabled))}
        >
          I am done
        </button>
      </div>
    </FeedbackShell>
  );
}
