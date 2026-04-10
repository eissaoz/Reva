"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { routes } from "@/lib/routes";

export default function ContactSalesPage() {
  const [open, setOpen] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
    window.setTimeout(() => setOpen(false), 2400);
  };

  return (
    <div className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-2">
      <section>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--gold)]">Talk to Sales</p>
        <h1 className="font-headline text-5xl font-extrabold tracking-tight">Build a plan for your locations.</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          Tell us about your operation and our team will help map rollout, training, and recovery workflows.
        </p>

        <div className="mt-8 space-y-4 text-sm text-[var(--text-secondary)]">
          <p className="veil-card p-4">Response time: under 24 hours</p>
          <p className="veil-card p-4">Live walkthrough included</p>
          <p className="veil-card p-4">Onboarding for multi-location teams</p>
        </div>

        <div className="mt-8">
          <Link href={routes.pricing} className="text-sm font-semibold text-[var(--gold)] hover:underline">
            Back to pricing
          </Link>
        </div>
      </section>

      <section className="veil-card p-7">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="veil-label" htmlFor="name">Full Name</label>
            <input id="name" className="veil-input" required />
          </div>
          <div>
            <label className="veil-label" htmlFor="company">Business / Group</label>
            <input id="company" className="veil-input" required />
          </div>
          <div>
            <label className="veil-label" htmlFor="email">Work Email</label>
            <input id="email" type="email" className="veil-input" required />
          </div>
          <div>
            <label className="veil-label" htmlFor="locations">Number of Locations</label>
            <select id="locations" className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" defaultValue="">
              <option value="" disabled>Select range</option>
              <option>1</option>
              <option>2-3</option>
              <option>4-10</option>
              <option>10+</option>
            </select>
          </div>
          <div>
            <label className="veil-label" htmlFor="message">What do you need help with?</label>
            <textarea id="message" rows={4} className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="veil-btn-primary w-full py-3 text-sm uppercase tracking-wide">Send Request</button>
        </form>
      </section>

      <Toast open={open} message="Thanks. Sales request sent (demo)." />
    </div>
  );
}
