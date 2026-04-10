"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FeedbackShell } from "@/components/feedback/feedback-shell";
import { RatingStars } from "@/components/feedback/rating-stars";
import { routes } from "@/lib/routes";

export default function FeedbackStartPage() {
  const [view, setView] = useState<"intro" | "rating">("intro");
  const [rating, setRating] = useState(0);
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slug = useMemo(() => {
    const raw = params?.slug;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params?.slug]);

  const nextHref = useMemo(() => {
    if (!slug || rating === 0) {
      return "";
    }

    return rating <= 3 ? routes.feedbackComplaint(slug, rating) : routes.feedbackReview(slug, rating);
  }, [slug, rating]);

  return (
    <FeedbackShell
      step={1}
      label={view === "intro" ? "Scan complete. Start rating." : "Pick a star rating to continue."}
      locationName="Spice Route Kitchen"
    >
      {view === "intro" ? (
        <>
          <span className="feedback-chip">Spice Route Kitchen</span>
          <h1 className="feedback-title">How was your visit today?</h1>
          <p className="feedback-copy">Your feedback helps us improve. No account. No app. Takes under 10 seconds.</p>

          <article className="feedback-card">
            <p className="feedback-muted">Your visit</p>
            <p className="feedback-main">Table 7 - Lunch service</p>
            <p className="feedback-sub">Monday, 6 April 2026</p>
          </article>

          <div className="mt-auto">
            <button type="button" className="feedback-btn feedback-btn-primary" onClick={() => setView("rating")}>Rate my experience</button>
            <p className="mt-3 text-center text-xs text-[var(--text-muted)]">No sign-up required.</p>
          </div>
        </>
      ) : (
        <>
          <h1 className="feedback-title">How would you rate your experience?</h1>
          <p className="feedback-copy">Tap a star.</p>
          <RatingStars value={rating} onChange={setRating} />
          <div className="feedback-note">1 to 3 stars opens a private complaint form. 4 to 5 stars opens Google review prompt.</div>

          <div className="mt-auto">
            <button
              type="button"
              className="feedback-btn feedback-btn-primary"
              disabled={!nextHref}
              onClick={() => {
                if (nextHref) {
                  router.push(nextHref);
                }
              }}
            >
              Continue
            </button>
            <button type="button" className="feedback-btn feedback-btn-secondary" onClick={() => setView("intro")}>Back to visit card</button>
          </div>
        </>
      )}
    </FeedbackShell>
  );
}
