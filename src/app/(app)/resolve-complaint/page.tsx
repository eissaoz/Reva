"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Toast } from "@/components/ui/toast";
import { routes } from "@/lib/routes";

export default function ResolveComplaintPage() {
  const [open, setOpen] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
    window.setTimeout(() => setOpen(false), 2400);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="veil-card p-6 lg:col-span-8">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight">Resolve Complaint</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Capture context, assign ownership, and launch recovery.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="veil-label" htmlFor="customer">Customer Name</label>
                <input id="customer" className="veil-input" required />
              </div>
              <div>
                <label className="veil-label" htmlFor="source">Source</label>
                <select id="source" className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" defaultValue="Google">
                  <option>Google</option>
                  <option>WhatsApp</option>
                  <option>Private Form</option>
                  <option>In-house Report</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="veil-label" htmlFor="priority">Priority</label>
                <select id="priority" className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" defaultValue="Urgent">
                  <option>Urgent</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="veil-label" htmlFor="owner">Assigned Owner</label>
                <input id="owner" className="veil-input" required placeholder="Elena Rossi" />
              </div>
            </div>

            <div>
              <label className="veil-label" htmlFor="summary">Complaint Summary</label>
              <textarea id="summary" className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" rows={4} required />
            </div>

            <div>
              <label className="veil-label" htmlFor="resolution">Resolution Plan</label>
              <textarea id="resolution" className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" rows={4} required />
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="submit" className="veil-btn-primary px-5 py-3 text-sm uppercase tracking-wide">Save Resolution</button>
              <Link href={routes.tasks} className="veil-btn-ghost px-5 py-3 text-sm">Back to Tasks</Link>
            </div>
          </form>
        </section>

        <aside className="space-y-6 lg:col-span-4">
          <article className="veil-card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Complaint Status</p>
            <p className="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ color: "var(--danger)", background: "var(--danger-bg)" }}>
              Urgent
            </p>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">Next follow-up should happen within 2 hours.</p>
          </article>

          <article className="veil-card p-6">
            <h2 className="font-headline text-xl font-bold tracking-tight">Recovery checklist</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <li>Call customer within SLA</li>
              <li>Issue service recovery voucher</li>
              <li>Log resolution notes</li>
              <li>Trigger follow-up WhatsApp journey</li>
            </ul>
          </article>
        </aside>
      </div>

      <Toast open={open} message="Complaint saved (demo)." />
    </>
  );
}
