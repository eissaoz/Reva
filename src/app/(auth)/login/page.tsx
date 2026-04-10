"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toast } from "@/components/ui/toast";
import { routes } from "@/lib/routes";

export default function LoginPage() {
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
      <header className="mb-8 text-center">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight">Sign in to REVA</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Enter your credentials to manage your reputation.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-7">
        <div>
          <label htmlFor="email" className="veil-label">Email Address</label>
          <input id="email" name="email" type="email" required className="veil-input" placeholder="name@business.com" />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className="veil-label mb-0">Password</label>
            <Link href={routes.forgotPassword} className="text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              Forgot password?
            </Link>
          </div>
          <input id="password" name="password" type="password" required className="veil-input" placeholder="••••••••" />
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <input type="checkbox" className="h-4 w-4 rounded border-[var(--border-strong)] bg-transparent" />
          Remember this device
        </label>

        <button type="submit" disabled={isSubmitting} className="veil-btn-primary w-full py-3 text-sm uppercase tracking-wide">
          <span className="inline-flex items-center gap-2">
            {isSubmitting ? <LoadingSpinner className="text-[var(--black)]" /> : null}
            <span>Sign In</span>
          </span>
        </button>

        <p className="text-center text-sm text-[var(--text-secondary)]">
          Don&apos;t have an account?{" "}
          <Link href={routes.signup} className="font-bold text-[var(--gold)] hover:underline">
            Start your free trial
          </Link>
        </p>
      </form>

      <Toast open={open} message="Signed in (demo). Backend will be added later." />
    </>
  );
}
