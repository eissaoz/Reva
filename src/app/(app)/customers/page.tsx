import Link from "next/link";
import { routes } from "@/lib/routes";

const segments = [
  { label: "New Guests", value: "428", hint: "First-time visits" },
  { label: "Regulars", value: "1,204", hint: "3+ visits in 60 days" },
  { label: "At-Risk", value: "84", hint: "No visit in 30+ days" },
  { label: "Recovered", value: "262", hint: "Recovered via WhatsApp" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight">Retention Intelligence</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Monitor loyalty cycles and recovery actions.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="veil-btn-ghost px-4 py-2 text-sm">Export CRM</button>
          <Link href={routes.contactSales} className="veil-btn-primary px-4 py-2 text-sm">New Campaign</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {segments.map((item) => (
          <article key={item.label} className="veil-card p-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{item.label}</p>
            <p className="mt-3 font-headline text-4xl font-extrabold tracking-tight">{item.value}</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">{item.hint}</p>
          </article>
        ))}
      </section>

      <section className="veil-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-[var(--bg)] text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Visits</th>
                <th className="px-4 py-3">Sentiment</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Noah Reed", "11", "Positive", "Nurture"],
                ["Maya Singh", "2", "Negative", "Recover"],
                ["Elena Rossi", "6", "Neutral", "Follow-up"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-[var(--border)]">
                  <td className="px-4 py-4 font-semibold">{row[0]}</td>
                  <td className="px-4 py-4">{row[1]}</td>
                  <td className="px-4 py-4 text-[var(--text-secondary)]">{row[2]}</td>
                  <td className="px-4 py-4">
                    {row[3] === "Recover" ? (
                      <Link href={routes.resolveComplaint} className="veil-btn-primary inline-block px-3 py-2 text-xs">Resolve</Link>
                    ) : (
                      <button className="veil-btn-ghost px-3 py-2 text-xs">{row[3]}</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
