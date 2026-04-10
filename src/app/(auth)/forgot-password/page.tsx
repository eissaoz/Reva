"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toast } from "@/components/ui/toast";
import { routes } from "@/lib/routes";

export default function ForgotPasswordPage() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setOpen(true);
    window.setTimeout(() => {
      setOpen(false);
      setIsSubmitting(false);
    }, 2400);
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight">Forgot password?</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Enter your email and we&apos;ll send a reset link.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="veil-label">Business Email</label>
          <input id="email" type="email" className="veil-input" placeholder="name@business.com" required />
        </div>

        <button type="submit" disabled={isSubmitting} className="veil-btn-primary w-full py-3 text-sm uppercase tracking-wide">
          <span className="inline-flex items-center gap-2">
            {isSubmitting ? <LoadingSpinner className="text-[var(--black)]" /> : null}
            <span>Send Reset Link</span>
          </span>
        </button>

        <Link href={routes.login} className="block text-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          Back to sign in
        </Link>
      </form>

      <Toast open={open} message="Reset email sent (demo). Check your inbox." />
    </>
  );
}
