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
              "Location",
              "Review Links",
              "Rewards Program",
              "QR Assets",
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
            <h2 className="font-headline text-2xl font-bold tracking-tight">Rewards Program</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Control whether happy customers see an optional reward after the Google review prompt.</p>

            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <label className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Enable rewards for 4 to 5 star customers</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">If enabled, customers can see an offer code after they complete the happy path.</p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1 h-4 w-4" />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="veil-label" htmlFor="rewardCode">Reward Code</label>
                <input id="rewardCode" className="veil-input" defaultValue="REVA10" />
              </div>
              <div>
                <label className="veil-label" htmlFor="rewardType">Reward Type</label>
                <select id="rewardType" className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm" defaultValue="percent">
                  <option value="percent">Percentage discount</option>
                  <option value="fixed">Fixed amount off</option>
                  <option value="text">Text-only offer</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="veil-label" htmlFor="rewardDetails">Offer Details</label>
              <textarea
                id="rewardDetails"
                rows={3}
                className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm"
                defaultValue="10% off your next visit. Valid for 30 days."
              />
            </div>

            <div className="mt-6 rounded-xl border border-[var(--gold)] bg-[var(--black)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--gold)]">Customer preview</p>
              <p className="mt-2 text-2xl font-black tracking-[0.15em] text-[var(--gold)]">REVA10</p>
              <p className="mt-1 text-xs text-[rgba(255,255,255,0.65)]">10% off your next visit. Valid for 30 days.</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="veil-btn-ghost px-4 py-2 text-sm" type="button">Disable rewards</button>
              <button className="veil-btn-primary px-4 py-2 text-sm" type="button">Save rewards settings</button>
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
