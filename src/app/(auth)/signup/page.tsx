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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const businessName = String(formData.get("businessName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!businessName) {
      setErrorMessage("Business name is required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch("/api/private/auth/sign-up", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        businessName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(payload?.error ?? "Unable to create account.");
      setIsSubmitting(false);
      return;
    }

    setOpen(true);
    router.push(routes.dashboard);
    router.refresh();
    setIsSubmitting(false);
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
          <input id="fullName" name="fullName" className="veil-input" placeholder="Alexander Hamilton" required />
        </div>
        <div>
          <label htmlFor="businessName" className="veil-label">Business Name</label>
          <input id="businessName" name="businessName" className="veil-input" placeholder="The Gilded Lily" required />
        </div>
        <div>
          <label htmlFor="email" className="veil-label">Business Email</label>
          <input id="email" name="email" type="email" className="veil-input" placeholder="alexander@veil.io" required />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className="veil-label">Password</label>
            <input id="password" name="password" type="password" className="veil-input" placeholder="••••••••" required />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="veil-label">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" className="veil-input" placeholder="••••••••" required />
          </div>
        </div>

        {errorMessage ? (
          <p className="rounded-md border border-[var(--danger)]/30 bg-[var(--danger-bg)] px-3 py-2 text-xs text-[var(--danger)]">
            {errorMessage}
          </p>
        ) : null}

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

      <Toast open={open} message="Account created successfully." />
    </>
  );
}
