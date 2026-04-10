"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toast } from "@/components/ui/toast";
import { routes } from "@/lib/routes";

export default function SignupPage() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setOpen(true);
    window.setTimeout(() => router.push(routes.dashboard), 700);
    window.setTimeout(() => {
      setOpen(false);
      setIsSubmitting(false);
    }, 2400);
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight">Create Account</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Begin your 14-day trial and protect your business reputation.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="veil-label">Full Name</label>
          <input id="fullName" className="veil-input" placeholder="Alexander Hamilton" required />
        </div>
        <div>
          <label htmlFor="businessName" className="veil-label">Business Name</label>
          <input id="businessName" className="veil-input" placeholder="The Gilded Lily" required />
        </div>
        <div>
          <label htmlFor="email" className="veil-label">Business Email</label>
          <input id="email" type="email" className="veil-input" placeholder="alexander@veil.io" required />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className="veil-label">Password</label>
            <input id="password" type="password" className="veil-input" placeholder="••••••••" required />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="veil-label">Confirm Password</label>
            <input id="confirmPassword" type="password" className="veil-input" placeholder="••••••••" required />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="veil-btn-primary w-full py-3 text-sm uppercase tracking-wide">
          <span className="inline-flex items-center gap-2">
            {isSubmitting ? <LoadingSpinner className="text-[var(--black)]" /> : null}
            <span>Create My Account</span>
          </span>
        </button>

        <p className="text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link href={routes.login} className="font-bold text-[var(--gold)] hover:underline">
            Log in
          </Link>
        </p>
      </form>

      <Toast open={open} message="Account created (demo). Backend will be added later." />
    </>
  );
}
