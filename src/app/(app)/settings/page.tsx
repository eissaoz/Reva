import Link from "next/link";
import { routes } from "@/lib/routes";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-5xl font-extrabold tracking-tight">System Settings</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Manage your business profile, links, and integrations.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="veil-card p-2">
            {[
              "Business Profile",
              "Locations",
              "Review Links",
              "QR Assets",
              "WhatsApp Integration",
              "Team",
              "Billing",
            ].map((tab, index) => (
              <button
                key={tab}
                className={`w-full rounded-md px-3 py-2 text-left text-sm ${index === 2 ? "bg-[var(--bg)] font-semibold" : "text-[var(--text-secondary)]"}`}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-6 lg:col-span-9">
          <section className="veil-card p-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight">Review Links</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Direct guests to the right destination automatically.</p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="veil-label" htmlFor="google">Google Review Link</label>
                <input id="google" className="veil-input" defaultValue="https://g.page/r/Cm.../review" />
              </div>
              <div>
                <label className="veil-label" htmlFor="tripadvisor">Tripadvisor Link</label>
                <input id="tripadvisor" className="veil-input" defaultValue="https://tripadvisor.com/review..." />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="veil-btn-ghost px-4 py-2 text-sm" type="button">Copy all links</button>
              <button className="veil-btn-primary px-4 py-2 text-sm" type="button">Save Changes</button>
            </div>
          </section>

          <section className="veil-card p-6">
            <h3 className="font-headline text-xl font-bold tracking-tight">Need implementation help?</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Our team can configure this for multi-location setups.</p>
            <div className="mt-4">
              <Link href={routes.contactSales} className="veil-btn-primary inline-block px-4 py-2 text-sm">Contact Sales</Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
