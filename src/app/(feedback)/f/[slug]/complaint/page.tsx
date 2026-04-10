"use client";

import { FormEvent, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FeedbackShell } from "@/components/feedback/feedback-shell";
import { routes } from "@/lib/routes";

export default function ComplaintPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = useMemo(() => {
    const raw = params?.slug;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params?.slug]);

  const rating = searchParams.get("rating") ?? "3";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!slug) {
      return;
    }
    router.push(routes.feedbackDone(slug, "complaint"));
  };

  return (
    <FeedbackShell
      step={2}
      label="Private complaint path. Shared only with the business."
      locationName="Spice Route Kitchen"
      backHref={slug ? routes.feedback(slug) : undefined}
    >
      <h1 className="feedback-title">We are sorry to hear that.</h1>
      <p className="feedback-copy">You rated {rating} stars. Please share what went wrong. This feedback is private.</p>

      <div className="feedback-flag feedback-flag-bad">
        Your message goes directly to the manager. It does not post publicly.
      </div>

      <form className="feedback-split" onSubmit={onSubmit}>
        <div>
          <label className="veil-label" htmlFor="details">What happened?</label>
          <textarea
            id="details"
            required
            rows={4}
            className="feedback-field"
            placeholder="Food quality, wait time, service issue, or anything else."
          />
        </div>

        <div>
          <label className="veil-label" htmlFor="phone">Phone number (optional)</label>
          <input id="phone" type="tel" className="feedback-field" placeholder="+254..." />
        </div>

        <label className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
          <input type="checkbox" className="mt-0.5" />
          <span>I agree this business may contact me about this complaint.</span>
        </label>

        <div className="mt-auto">
          <button type="submit" className="feedback-btn feedback-btn-primary">Send private feedback</button>
          <button
            type="button"
            className="feedback-btn feedback-btn-secondary"
            onClick={() => slug && router.push(routes.feedbackDone(slug, "complaint"))}
          >
            Skip and finish
          </button>
        </div>
      </form>
    </FeedbackShell>
  );
}
