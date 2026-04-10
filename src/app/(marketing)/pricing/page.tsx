import Link from "next/link";
import { routes } from "@/lib/routes";

const tiers = [
  {
    name: "Starter",
    price: "$99",
    setup: "$199 setup",
    points: ["1 location", "500 WhatsApps/mo", "Core dashboard", "Standard support"],
    cta: "Select Starter",
    href: routes.signup,
  },
  {
    name: "Growth",
    price: "$199",
    setup: "$299 setup",
    points: ["3 locations", "2,000 WhatsApps/mo", "Priority alerts", "Advanced analytics"],
    cta: "Select Growth",
    href: routes.signup,
    featured: true,
  },
  {
    name: "Chain",
    price: "$499",
    setup: "$499 setup",
    points: ["10+ locations", "Full API access", "Custom integrations", "Dedicated manager"],
    cta: "Contact Sales",
    href: routes.contactSales,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-16 pb-10">
      <section className="space-y-5 text-center md:text-left">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-7xl">Simple, serious pricing for serious businesses.</h1>
        <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)] md:mx-0">
          Reputation is infrastructure. Choose the tier that matches your operational scale.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`veil-card flex flex-col p-7 ${
              tier.featured ? "border-[var(--gold)] bg-[var(--gold-pale)] text-[var(--text-primary)] dark:bg-[var(--black)]" : ""
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-[0.15em] ${tier.featured ? "text-[var(--text-secondary)]" : "opacity-70"}`}>
              {tier.name}
            </p>
            <div className="my-6">
              <span className="font-headline text-5xl font-extrabold tracking-tight">{tier.price}</span>
              <span className={`ml-1 text-sm ${tier.featured ? "text-[var(--text-secondary)]" : "opacity-70"}`}>/mo</span>
              <p className={`mt-2 text-xs uppercase tracking-[0.15em] ${tier.featured ? "text-[var(--text-secondary)]" : "opacity-65"}`}>
                {tier.setup}
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3 text-sm">
              {tier.points.map((point) => (
                <li className="flex items-center gap-2" key={point}>
                  <span className="material-symbols-outlined text-base text-[var(--gold)]">check</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href={tier.href}
              className={`rounded-md px-4 py-3 text-center text-sm font-bold ${
                tier.featured ? "bg-[var(--gold)] text-[var(--black)]" : "veil-btn-ghost"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--black)] px-8 py-12 text-center text-[#ebebea]">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight">Need a custom enterprise rollout?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#b9b9b9]">
          We can tailor REVA for groups, franchise operations, and multi-region compliance.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={routes.contactSales} className="veil-btn-primary px-6 py-3 text-sm">Contact Sales</Link>
          <Link href={routes.signup} className="rounded-md border border-[#3a3a3f] px-6 py-3 text-sm font-semibold">Start Free Trial</Link>
        </div>
      </section>
    </div>
  );
}
