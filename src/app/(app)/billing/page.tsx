import Link from "next/link";
import { routes } from "@/lib/routes";

const plans = [
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

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight">Pricing / Billing</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Manage your plan without leaving the operations workspace.</p>
        </div>
        <Link href={routes.contactSales} className="veil-btn-ghost px-4 py-2 text-sm">
          Contact Sales
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`veil-card flex flex-col p-7 ${
              plan.featured ? "border-[var(--gold)] bg-[var(--gold-pale)] text-[var(--text-primary)] dark:bg-[var(--black)]" : ""
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-[0.15em] ${plan.featured ? "text-[var(--text-secondary)]" : "opacity-70"}`}>
              {plan.name}
            </p>
            <div className="my-6">
              <span className="font-headline text-5xl font-extrabold tracking-tight">{plan.price}</span>
              <span className={`ml-1 text-sm ${plan.featured ? "text-[var(--text-secondary)]" : "opacity-70"}`}>/mo</span>
              <p className={`mt-2 text-xs uppercase tracking-[0.15em] ${plan.featured ? "text-[var(--text-secondary)]" : "opacity-65"}`}>
                {plan.setup}
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3 text-sm">
              {plan.points.map((point) => (
                <li className="flex items-center gap-2" key={point}>
                  <span className="material-symbols-outlined text-base text-[var(--gold)]">check</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`rounded-md px-4 py-3 text-center text-sm font-bold ${
                plan.featured ? "bg-[var(--gold)] text-[var(--black)]" : "veil-btn-ghost"
              }`}
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
