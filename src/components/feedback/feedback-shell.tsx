import type { ReactNode } from "react";
import Link from "next/link";
import { StepDots } from "@/components/feedback/step-dots";

type FeedbackShellProps = {
  children: ReactNode;
  locationName: string;
  label: string;
  step: number;
  backHref?: string;
};

export function FeedbackShell({ children, locationName, label, step, backHref }: FeedbackShellProps) {
  return (
    <main className="feedback-stage">
      <section className="feedback-screen">
        <header className="feedback-topbar">
          <p className="feedback-brand">REVA.</p>
          <p className="feedback-topbar-sub">{locationName}</p>
        </header>

        <div className="feedback-content">{children}</div>

        <footer className="feedback-bottom">
          <p className="feedback-label">{label}</p>
          <StepDots step={step} />
          <div className="feedback-nav">
            {backHref ? (
              <Link href={backHref} className="feedback-back">
                Back
              </Link>
            ) : (
              <span />
            )}
          </div>
        </footer>
      </section>
    </main>
  );
}
