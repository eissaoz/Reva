import Link from "next/link";
import { getOptionalAccountContext } from "@/server/auth/context";
import { getOnboardingSnapshot } from "@/server/onboarding/service";
import { routes } from "@/lib/routes";

const stats = [
  { label: "Avg Rating", value: "4.8", delta: "+0.2" },
  { label: "Complaints", value: "12", delta: "2 urgent" },
  { label: "Reviews", value: "84", delta: "+15%" },
  { label: "Private Caught", value: "14", delta: "Intercepted" },
];

export default async function DashboardPage() {
  const context = await getOptionalAccountContext();
  const onboarding = context ? await getOnboardingSnapshot(context.accountId) : null;
  const onboardingIncomplete = onboarding ? onboarding.nextStep !== "ready_for_qr" : false;

  return (
    <div className="space-y-8">
      {onboardingIncomplete ? (
        <section className="veil-card border-[var(--gold)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Onboarding pending</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Complete onboarding to finalize your business setup.</p>
            </div>
            <Link href={routes.onboarding} className="veil-btn-primary px-4 py-2 text-xs uppercase tracking-wide">
              Continue onboarding
            </Link>
          </div>
        </section>
      ) : null}

      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight">System Vitals</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Operational status: <span className="text-[var(--success)]">OPTIMAL</span></p>
        </div>
        <Link href={routes.resolveComplaint} className="veil-btn-primary px-5 py-3 text-sm">Resolve Complaint</Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className="veil-card p-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{item.label}</p>
            <p className="mt-3 font-headline text-4xl font-extrabold tracking-tight text-[var(--gold)]">{item.value}</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">{item.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <article className="veil-card p-6 lg:col-span-2">
          <h2 className="font-headline text-2xl font-bold tracking-tight">Live feedback stream</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3">
              <span>Amira K. — Excellent service</span>
              <span className="rounded-full border border-[var(--gold)] px-2 py-0.5 text-xs text-[var(--gold)]">Google ↗</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3">
              <span>James M. — Long wait</span>
              <Link href={routes.resolveComplaint} className="rounded-full px-2 py-0.5 text-xs" style={{ color: "var(--danger)", background: "var(--danger-bg)" }}>
                Resolve
              </Link>
            </div>
            <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3">
              <span>Fatuma A. — Will return</span>
              <span className="rounded-full px-2 py-0.5 text-xs" style={{ color: "var(--success)", background: "var(--success-bg)" }}>Recovered</span>
            </div>
          </div>
        </article>

        <article className="veil-card p-6">
          <h2 className="font-headline text-xl font-bold tracking-tight">Quick Links</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Link href={routes.customers} className="block rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2">Customers</Link>
            <Link href={routes.tasks} className="block rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2">Tasks</Link>
            <Link href={routes.settings} className="block rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2">Settings</Link>
            <Link href={routes.billing} className="block rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2">Pricing / Billing</Link>
          </div>
        </article>
      </section>
    </div>
  );
}
