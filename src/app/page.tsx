import { ThemeToggle } from "@/components/theme-toggle";
import { LoadingLink } from "@/components/ui/loading-link";
import { Reveal } from "@/components/ui/reveal";
import { routes } from "@/lib/routes";

const withoutReva = [
  ["Customer has a bad experience", "Doesn't say anything to you. Smiles. Leaves."],
  ["1-star lands on Google", "Permanent. Public. You had no chance to fix it."],
  ["Revenue walks out the door", "Future customers read the review and choose somewhere else."],
];

const withReva = [
  ["Customer rates their experience", "QR code on the table or receipt - one scan, one tap, done."],
  ["REVA routes every experience", "Low rating → direct feedback form to you. High rating → Google review page."],
  ["You recover, grow, and retain", "Automated WhatsApp follow-up brings unhappy customers back. Happy ones spread the word."],
];

const features = [
  ["shield", "Direct complaint resolution", "Unhappy customers reach you directly through a private form. You hear the issue first and have the chance to make it right before they go anywhere else."],
  ["star", "Review growth engine", "Happy customers are invited to share their experience on Google with one tap. Authentic reviews from real customers who genuinely enjoyed their visit."],
  ["chat", "WhatsApp recovery engine", "After every rating, automated WhatsApp messages go out - apology and offer for unhappy guests, thank-you for happy ones. Runs automatically. Feels personal."],
  ["analytics", "Live multi-location dashboard", "Real-time sentiment data across all your locations. Know what is happening the moment it happens."],
  ["qr_code_2", "Custom QR kit", "Branded QR codes for every table, receipt, and counter. Set up in minutes, works immediately."],
  ["notifications_active", "Instant alert system", "Get notified the moment a complaint comes in. Respond before the customer gets home."],
];

const journey = [
  ["business_center", "They visit", "Customer has a meal or service experience at your business"],
  ["qr_code_scanner", "They scan", "QR code on table or receipt - one scan, five stars, done in 10 seconds"],
  ["star_rate", "They rate", "Simple 1-5 star rating on a clean branded page"],
  ["call_split", "REVA routes", "Low rating → direct feedback to you. High rating → Google review page. Instant."],
  ["chat", "They return", "WhatsApp follow-up brings them back with offers and loyalty"],
];

const faqs = [
  [
    "How does REVA help me respond to unhappy customers faster?",
    "When a customer rates 1 to 3 stars, they are invited to share their feedback directly with your business through a simple form. You receive it instantly and can respond, call, or send a recovery offer before they leave the building. Customers who feel heard are far more likely to return and update their perception of your business. Customers who rate 4 to 5 stars are invited to share their experience on Google with one tap.",
  ],
  [
    "Do my customers need to download anything?",
    "No. REVA works entirely through any smartphone browser. Customers scan a QR code on the table or receipt and are taken directly to the rating page. Zero friction. Zero downloads. The simpler it is, the more feedback you collect.",
  ],
  [
    "How does the WhatsApp follow-up work?",
    "After a customer submits their rating, REVA automatically sends them a WhatsApp message. Unhappy customers receive a personal apology and a recovery offer to bring them back. Happy customers receive a warm thank-you. The WhatsApp follow-up happens after the rating - not before. No number collection required upfront. The recovery rate for unhappy customers averages 67%.",
  ],
  [
    "How long does setup take?",
    "Most businesses are fully live within 48 hours of signup. Setup includes branded QR kit design, WhatsApp Business API integration, dashboard configuration for all your locations, and a walkthrough session with our team. We handle everything technical - you just confirm your details.",
  ],
  [
    "Does this work for businesses without a Google presence?",
    "Yes. For businesses without a Google Business profile, REVA handles setup of your online presence as part of onboarding - at no extra cost. We set up your Google profile, optimise it, and then connect REVA to start generating your first reviews from day one.",
  ],
  [
    "What happens if I want to cancel?",
    "Cancel anytime with 30 days written notice. No lock-in, no penalties. All your data and complaint history is yours - we export everything to you before offboarding. The only thing you lose is the protection. Your Google reviews and existing rating remain.",
  ],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <header className="fixed top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4">
          <p className="font-headline text-xl font-black tracking-[0.08em]">
            REVA<span className="text-[var(--gold)]">.</span>
          </p>
          <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-[0.03em] text-[var(--text-secondary)] md:flex">
            <a href="#product" className="hover:text-[var(--text-primary)]">Product</a>
            <a href="#how" className="hover:text-[var(--text-primary)]">How it works</a>
            <a href="#pricing" className="hover:text-[var(--text-primary)]">Pricing</a>
            <a href="#faq" className="hover:text-[var(--text-primary)]">FAQ</a>
            <a href="#contact" className="hover:text-[var(--text-primary)]">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LoadingLink href={routes.contactSales} className="hidden rounded-md border border-[var(--border-strong)] px-4 py-2 text-[13px] font-semibold md:inline-flex" spinnerClassName="text-[var(--text-primary)]">
              Book Demo
            </LoadingLink>
            <LoadingLink href={routes.signup} className="veil-btn-primary rounded-md px-5 py-2 text-[13px] font-bold" spinnerClassName="text-[var(--black)]">
              Start Free Trial
            </LoadingLink>
          </div>
        </div>
      </header>

      <main className="pt-[84px]">
        <section id="product" className="scroll-mt-28 px-6 py-16 md:py-20">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(196,165,53,0.35)] bg-[rgba(196,165,53,0.12)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--gold)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Reputation &amp; Revenue · Built for Growing Businesses
                </p>
                <h1 className="font-headline text-[clamp(3.2rem,7vw,5.8rem)] font-black leading-[1.03] tracking-[-0.035em]">
                  Turn reputation
                  <br />
                  <span className="text-[var(--gold)]">into revenue.</span>
                </h1>
                <p className="mb-9 mt-6 max-w-[520px] text-[18px] leading-[1.75] text-[var(--text-secondary)]">
                  REVA captures every customer experience the moment it happens. Unhappy customers get heard and recovered. Happy customers become 5-star Google reviews. Every interaction drives growth.
                </p>
                <div className="mb-12 flex flex-wrap gap-3">
                  <LoadingLink href={routes.signup} className="veil-btn-primary rounded-lg px-8 py-3.5 text-[15px]" spinnerClassName="text-[var(--black)]">
                    Start Free Trial
                  </LoadingLink>
                  <LoadingLink href={routes.contactSales} className="veil-btn-ghost rounded-lg px-6 py-3.5 text-[15px]" spinnerClassName="text-[var(--text-primary)]">
                    See Demo
                  </LoadingLink>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="h-px w-8 bg-[var(--border-strong)]" />
                  <span className="tracking-[0.04em]">Trusted by growing businesses across East Africa</span>
                  <span className="font-bold uppercase tracking-[0.06em]">Meridian</span>
                  <span>·</span>
                  <span className="font-bold uppercase tracking-[0.06em]">Tamarind</span>
                  <span>·</span>
                  <span className="font-bold uppercase tracking-[0.06em]">Kiza</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <div className="rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-4">
                  <div className="mb-3 flex items-center justify-between rounded-xl bg-[var(--black)] px-4 py-3 text-[#ebebea]">
                    <p className="font-headline text-sm font-black tracking-[0.06em]">REVA<span className="text-[var(--gold)]">.</span></p>
                    <div className="hidden items-center gap-1 text-[9px] lg:flex">
                      <span className="rounded bg-[rgba(235,235,234,0.08)] px-2 py-1">Overview</span>
                      <span className="px-2">Reviews</span>
                      <span className="px-2">Alerts</span>
                      <span className="px-2">Settings</span>
                    </div>
                    <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 text-[9px] font-extrabold text-[var(--black)]">● LIVE</span>
                  </div>
                  <div className="mb-2 grid grid-cols-3 gap-2">
                    {[
                      ["4.8", "Google rating", "↑ +0.4 this month", "var(--ok)"],
                      ["23", "Complaints resolved", "recovered this month", "var(--gold)"],
                      ["41", "New Google reviews", "↑ +12 vs last month", "var(--ok)"],
                    ].map((item) => (
                      <div key={item[1]} className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 dark:bg-[var(--bg-inset)]">
                        <p className="font-headline text-2xl font-extrabold leading-none">{item[0]}</p>
                        <p className="mt-1 text-[9px] text-[var(--text-muted)]">{item[1]}</p>
                        <p className="mt-1 text-[9px] font-bold" style={{ color: `var(${item[3]})` }}>{item[2]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3 dark:bg-[var(--bg-inset)]">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--gold)]">Live feedback - today</p>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ok)" }} /><span className="flex-1">Amira K. - Food was incredible, will be back</span><span className="rounded-full border px-2 py-0.5 text-[9px] font-bold" style={{ color: "var(--ok)", borderColor: "var(--ok)", background: "var(--ok-bg)" }}>Google ↗</span></div>
                      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--danger)" }} /><span className="flex-1">James M. - Waited 40 mins, no updates from staff</span><span className="rounded-full border px-2 py-0.5 text-[9px] font-bold" style={{ color: "var(--danger)", borderColor: "var(--danger)", background: "var(--danger-bg)" }}>Handled ✓</span></div>
                      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ok)" }} /><span className="flex-1">Fatuma A. - Best evening in a long time</span><span className="rounded-full border px-2 py-0.5 text-[9px] font-bold" style={{ color: "var(--ok)", borderColor: "var(--ok)", background: "var(--ok-bg)" }}>Google ↗</span></div>
                      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--danger)" }} /><span className="flex-1">David N. - Wrong order brought twice</span><span className="rounded-full border px-2 py-0.5 text-[9px] font-bold" style={{ color: "var(--danger)", borderColor: "var(--danger)", background: "var(--danger-bg)" }}>Handled ✓</span></div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 dark:bg-[var(--bg-inset)]">
                      <p className="text-[9px] text-[var(--text-muted)]">Resolution rate</p>
                      <div className="mt-1 h-1 rounded bg-[var(--bg-inset)] dark:bg-[var(--bg-card)]"><div className="h-1 w-[85%] rounded bg-[var(--gold)]" /></div>
                      <p className="mt-1 text-[9px] font-bold text-[var(--gold)]">85% - excellent</p>
                    </div>
                    <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 dark:bg-[var(--bg-inset)]">
                      <p className="text-[9px] text-[var(--text-muted)]">Recovery rate</p>
                      <div className="mt-1 h-1 rounded bg-[var(--bg-inset)] dark:bg-[var(--bg-card)]"><div className="h-1 w-[67%] rounded" style={{ background: "var(--ok)" }} /></div>
                      <p className="mt-1 text-[9px] font-bold" style={{ color: "var(--ok)" }}>67% - returning</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-start gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-3">
                  <span className="material-symbols-outlined mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border text-base" style={{ color: "var(--danger)", borderColor: "var(--danger)", background: "var(--danger-bg)" }}>
                    notifications
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-bold">New complaint received - action needed</p>
                    <p className="text-xs text-[var(--text-muted)]">James M. gave 2★ - &quot;Waited 40 mins&quot; - Send recovery message?</p>
                  </div>
                  <LoadingLink href={routes.resolveComplaint} className="veil-btn-primary rounded px-3 py-1.5 text-[11px]" spinnerClassName="text-[var(--black)]">
                    Respond
                  </LoadingLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-16 md:pb-24">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
            {[
              ["0", "Direct competitors serving the African business market"],
              ["2 taps", "Maximum customer effort - scan, rate, done in under 10 seconds"],
              ["7×", "Cheaper than the nearest global competitor for East African businesses"],
            ].map((item) => (
              <div key={item[0]} className="bg-[var(--bg-card)] px-8 py-10 text-center">
                <p className="font-headline text-5xl font-black text-[var(--gold)]">{item[0]}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{item[1]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[var(--bg-card)] px-6 py-20">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-14 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">The problem</p>
                <h2 className="font-headline text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold leading-tight">Your reputation is being decided without you.</h2>
                <p className="mb-8 mt-5 text-[18px] leading-[1.75] text-[var(--text-secondary)]">Every time a customer has a bad experience and says nothing to you - then goes home and writes a 1-star review - you lose. Not just the review. The customer. The customers who read it. And your ability to respond.</p>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--danger)" }}>Without REVA</p>
                  <div className="space-y-5">
                    {withoutReva.map((step, idx) => (
                      <div className="flex gap-4" key={step[0]}>
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-black" style={{ color: "var(--danger)", borderColor: "var(--danger)" }}>{idx + 1}</div>
                        <div>
                          <p className="font-headline text-base font-bold">{step[0]}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{step[1]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">The solution</p>
                <h2 className="font-headline text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold leading-tight">REVA gives you a voice in every customer conversation. You respond, recover, and grow.</h2>
                <p className="mb-8 mt-5 text-[18px] leading-[1.75] text-[var(--text-secondary)]">The moment a customer rates their experience, REVA acts. Unhappy customers reach you directly so you can make it right. Happy customers are guided to share their experience on Google. Every customer gets a follow-up that brings them back.</p>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--ok)" }}>With REVA</p>
                  <div className="space-y-5">
                    {withReva.map((step, idx) => (
                      <div className="flex gap-4" key={step[0]}>
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] text-sm font-black text-[var(--gold)]">{idx + 1}</div>
                        <div>
                          <p className="font-headline text-base font-bold">{step[0]}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{step[1]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="how" className="scroll-mt-28 px-6 py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">How it works</p>
                <h2 className="font-headline text-[clamp(2rem,4vw,3rem)] font-extrabold">Three steps. One system. Real results.</h2>
                <p className="mx-auto mt-3 max-w-[520px] text-[17px] leading-[1.7] text-[var(--text-secondary)]">REVA works automatically after every customer visit. You see the reviews grow and the revenue follow.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
              {[
                ["qr_code_2", "01", "Capture every experience", "After every visit, a QR code on the table or receipt opens the REVA rating page instantly. No app to download, no sign up. Just five stars on a clean page - one tap and they are done in under 10 seconds."],
                ["call_split", "02", "Route every experience", "REVA reads every rating instantly. 1 to 3 stars - the customer is invited to share feedback directly with you so you can respond and resolve. 4 to 5 stars - the customer is guided to your Google review page with one tap. Every experience goes where it creates the most value."],
                ["chat", "03", "Recover and retain", "Unhappy customers receive an automatic WhatsApp apology and recovery offer. Happy customers receive a warm WhatsApp thank-you. Both messages are automated - the business does nothing. Customers come back."],
              ].map((step, index) => (
                <div key={step[1]} className={`bg-[var(--bg-card)] px-8 py-9 ${index === 1 ? "md:bg-[var(--bg-inset)]" : ""}`}>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gold)] text-[var(--black)]">
                    <span className="material-symbols-outlined text-2xl">{step[0]}</span>
                  </div>
                  <p className="font-headline text-5xl font-black leading-none text-[var(--border-strong)]">{step[1]}</p>
                  <p className="mt-4 font-headline text-lg font-bold">{step[2]}</p>
                  <p className="mt-2 text-sm leading-[1.7] text-[var(--text-secondary)]">{step[3]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-card)] px-6 py-20" id="product-detail">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">What you get</p>
              <h2 className="font-headline text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold leading-tight">Every tool your reputation needs. Nothing it doesn&apos;t.</h2>
              <p className="mb-8 mt-5 text-[18px] leading-[1.75] text-[var(--text-secondary)]">REVA is a reputation growth system. Every feature exists to help your business collect better feedback, generate more reviews, recover unhappy customers, and turn reputation into measurable revenue.</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((feature, idx) => (
                  <Reveal key={feature[1]} delay={idx * 70}>
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 hover:-translate-y-0.5 hover:border-[rgba(196,165,53,0.35)]">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)] text-[var(--black)]"><span className="material-symbols-outlined">{feature[0]}</span></div>
                      <p className="font-headline text-[15px] font-bold">{feature[1]}</p>
                      <p className="mt-1 text-[13px] leading-[1.65] text-[var(--text-secondary)]">{feature[2]}</p>
                    </div>
                  </Reveal>
                ))}
                <div className="sm:col-span-2 rounded-xl border border-[rgba(196,165,53,0.35)] bg-[rgba(196,165,53,0.12)] p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--black)] text-[var(--gold)]"><span className="material-symbols-outlined">redeem</span></div>
                  <p className="font-headline text-[15px] font-bold">Built-in incentive system</p>
                  <p className="mt-1 text-[13px] leading-[1.65] text-[var(--text-secondary)]">First-time customers earn a discount by leaving a Google review - the reward unlocks only after the review is posted. Drives real reviews, not just scans. Returning customers are recognised automatically so the discount is never issued twice to the same person.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-3">
                <div className="rounded-2xl border px-6 py-6" style={{ background: "var(--danger-bg)", borderColor: "rgba(153,31,31,0.15)" }}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: "var(--danger)" }}>Without REVA - what businesses face</p>
                  <div className="space-y-2 text-sm">
                    <p>Bad review lands on Google. Permanent. No context.</p>
                    <p>Good experience happens. Customer leaves. Never reviews.</p>
                    <p>Unhappy customer tells 10 friends. You find out never.</p>
                    <p>Rating drops. New customers choose the competition.</p>
                  </div>
                </div>
                <div className="rounded-2xl border px-6 py-6" style={{ background: "var(--ok-bg)", borderColor: "rgba(26,107,53,0.15)" }}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: "var(--ok)" }}>With REVA - what you control</p>
                  <div className="space-y-2 text-sm">
                    <p>Bad experience → customer reaches you directly → you resolve it fast.</p>
                    <p>Good experience → customer invited to Google → authentic 5-star review.</p>
                    <p>Unhappy customer → WhatsApp offer → returns and spends more.</p>
                    <p>Rating climbs. Your reputation becomes your competitive advantage.</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-[rgba(235,235,234,0.07)] bg-[var(--black)] p-px">
                {["4.8", "+41", "83%"].map((n, i) => (
                  <div key={n} className="bg-[var(--black)] px-4 py-5 text-center text-[#ebebea]">
                    <p className="font-headline text-3xl font-black text-[var(--gold)]">{n}</p>
                    <p className="mt-1 text-[11px] text-[rgba(235,235,234,0.4)]">{i === 0 ? "Avg rating" : i === 1 ? "New reviews" : "Resolved"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-[1200px] text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">The customer journey</p>
            <h2 className="font-headline text-[clamp(2rem,4vw,3rem)] font-extrabold">What your customers experience</h2>
            <p className="mx-auto mt-3 max-w-[520px] text-[17px] leading-[1.7] text-[var(--text-secondary)]">Frictionless for them. Powerful for you. No app. No account. Just a scan and 10 seconds.</p>
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {journey.map((step, idx) => (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-6" key={step[1]}>
                  <div className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${idx === 3 ? "bg-[var(--bg-inset)]" : "bg-[var(--gold)]"}`}>
                    <span className={`material-symbols-outlined text-xl ${idx === 3 ? "text-[var(--gold)]" : "text-[var(--black)]"}`}>{step[0]}</span>
                  </div>
                  <p className="font-headline text-base font-bold">{step[1]}</p>
                  <p className="mt-1 text-[13px] text-[var(--text-secondary)]">{step[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-card)] px-6 py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 text-center">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">Results</p>
              <h2 className="font-headline text-[clamp(2rem,4vw,3rem)] font-extrabold">Businesses turning reputation into revenue</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                ["We went from 3.9 to 4.7 on Google in two months. Before REVA complaints went straight online. Now we hear about them first, fix them, and those customers come back.", "SK", "Sarah Okonkwo", "Director, Meridian Business Group · 3 locations"],
                ["The WhatsApp follow-up is the best part. A customer complained about wait time, we sent them a discount, they came back twice the next week. That is money we would have lost.", "AM", "Ahmed Musa", "Owner, Spice Route Kitchen · Nairobi"],
                ["Setup took less than two days and we were live. The dashboard is clean and tells me everything I need to know. I check it every morning before anything else.", "FW", "Fatuma Wanjiru", "Operations Manager, Harbour House · 5 locations"],
              ].map((t) => (
                <div key={t[2]} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-6 py-6">
                  <p className="mb-3 text-[var(--gold)]">★★★★★</p>
                  <p className="text-sm leading-[1.7] text-[var(--text-secondary)]">&quot;{t[0]}&quot;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[var(--black)]">{t[1]}</div>
                    <div>
                      <p className="text-sm font-bold">{t[2]}</p>
                      <p className="text-xs text-[var(--text-muted)]">{t[3]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-28 px-6 py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 text-center">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">Pricing</p>
              <h2 className="font-headline text-[clamp(2rem,4vw,3rem)] font-extrabold">Investment in growth</h2>
              <p className="mx-auto mt-3 max-w-[460px] text-[17px] leading-[1.7] text-[var(--text-secondary)]">No hidden fees. No long-term lock-in. Cancel anytime with 30 days notice.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                ["Starter", "$49", "+ $99 one-time setup", ["1 location", "Basic WhatsApp follow-up", "Custom QR kit", "Core dashboard", "Complaint capture", "Google review redirect"], false, routes.signup],
                ["Growth", "$99", "+ $199 one-time setup", ["2 to 5 locations", "Advanced WhatsApp automations", "Priority complaint alerts", "Detailed sentiment analytics", "Multi-location dashboard", "Monthly performance report"], true, routes.signup],
                ["Chain", "$199", "+ $349 one-time setup", ["6+ locations", "Full API access", "Multi-region rollout support", "Dedicated success manager", "Custom integrations", "SLA guarantee"], false, routes.contactSales],
              ].map((plan) => (
                <div
                  key={String(plan[0])}
                  className={`flex h-full flex-col rounded-2xl border p-8 ${
                    plan[4]
                      ? "border-[var(--gold)] bg-[var(--gold-pale)] text-[var(--text-primary)] dark:bg-[var(--black)] dark:text-[#ebebea]"
                      : "border-[var(--border)] bg-[var(--bg-card)]"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className={`text-[11px] font-bold uppercase tracking-[0.1em] ${plan[4] ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}`}>{plan[0]}</p>
                    {plan[4] ? <span className="rounded-full bg-[rgba(196,165,53,0.15)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--gold)]">Most Popular</span> : null}
                  </div>
                  <div>
                    <span className="font-headline text-5xl font-black">{plan[1]}</span>
                    <span className={`ml-1 text-sm ${plan[4] ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}`}>/mo</span>
                    <p className={`mt-1 text-xs ${plan[4] ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}`}>{plan[2]}</p>
                  </div>
                  <div className="my-6 h-px bg-[var(--border)]" />
                  <div className={`mb-6 flex flex-1 flex-col gap-2 text-sm ${plan[4] ? "text-[var(--text-primary)] dark:text-[#ebebea]" : ""}`}>
                    {(plan[3] as string[]).map((line) => (
                      <div key={line} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-[var(--gold)]">check</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <LoadingLink href={String(plan[5])} className={`${plan[4] ? "veil-btn-primary" : "veil-btn-ghost"} w-full justify-center rounded-md py-3 text-sm`} spinnerClassName={plan[4] ? "text-[var(--black)]" : "text-[var(--text-primary)]"}>
                    {plan[4] ? "Get Started" : String(plan[0]) === "Chain" ? "Contact Sales" : "Get Started"}
                  </LoadingLink>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-[var(--text-secondary)]">
              <span className="material-symbols-outlined text-[18px] text-[var(--gold)]">verified</span>
              <span>7-day free trial · No credit card required · Cancel anytime · Setup in 48 hours</span>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 bg-[var(--bg-card)] px-6 py-20">
          <div className="mx-auto w-full max-w-[760px]">
            <div className="mb-12 text-center">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">FAQ</p>
              <h2 className="font-headline text-[clamp(2rem,4vw,3rem)] font-extrabold">Frequently asked questions</h2>
            </div>
            <div className="space-y-0">
              {faqs.map((faq) => (
                <div key={faq[0]} className="border-b border-[var(--border)] py-6">
                  <p className="mb-2 flex items-start justify-between gap-3 font-headline text-[17px] font-bold">
                    <span>{faq[0]}</span>
                    <span className="material-symbols-outlined text-[18px] text-[var(--gold)]">expand_more</span>
                  </p>
                  <p className="text-sm leading-[1.75] text-[var(--text-secondary)]">{faq[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 px-6 py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--black)] px-8 py-16 text-center text-[#ebebea]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[560px] -translate-x-1/2 -translate-y-1/2 bg-[var(--gold)] opacity-[0.08] blur-[90px]" />
              <p className="relative z-10 mb-4 text-[11px] uppercase tracking-[0.12em] text-[rgba(235,235,234,0.45)]">Start today</p>
              <h2 className="relative z-10 font-headline text-[clamp(2.6rem,6vw,4.6rem)] font-black leading-[1.05] tracking-[-0.03em]">
                Turn reputation
                <br />
                <span className="text-[var(--gold)]">into revenue.</span>
              </h2>
              <p className="relative z-10 mx-auto mt-4 max-w-3xl text-sm text-[rgba(235,235,234,0.7)]">
                Join businesses across East Africa using REVA to resolve complaints faster, grow their Google ratings, and turn every customer into recurring revenue.
              </p>
              <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
                <LoadingLink href={routes.signup} className="rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-black hover:bg-zinc-100" spinnerClassName="text-black">
                  Start Free Trial - 7 Days
                </LoadingLink>
                <LoadingLink href={routes.contactSales} className="rounded-lg border border-[rgba(235,235,234,0.2)] px-7 py-3.5 text-sm font-semibold text-[rgba(235,235,234,0.85)]" spinnerClassName="text-[rgba(235,235,234,0.9)]">
                  Talk to an expert →
                </LoadingLink>
              </div>
              <p className="relative z-10 mt-6 text-xs tracking-[0.04em] text-[rgba(235,235,234,0.35)]">No credit card required · Setup in 48 hours · Cancel anytime</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--bg-card)] px-6 py-16">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <p className="font-headline text-3xl font-black">REVA</p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">Turn reputation into revenue.<br />Every experience captured. Every customer valued. Every review earned.</p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">© 2026 REVA · All rights reserved</p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em]">Product</p>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Features</a>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Integration</a>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Roadmap</a>
            <a className="block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Changelog</a>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em]">Company</p>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">About</a>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Manifesto</a>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Careers</a>
            <a className="block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Press</a>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em]">Legal</p>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Privacy</a>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Terms</a>
            <a className="mb-3 block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">Security</a>
            <a className="block text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]" href="#">GDPR</a>
          </div>
        </div>
        <div className="mx-auto mt-12 flex w-full max-w-[1200px] flex-col justify-between gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] md:flex-row">
          <p>© 2026 REVA · All rights reserved</p>
          <p>Built by <span className="font-semibold">Flowzzy</span> · Digital Solutions · flowzzy.org</p>
        </div>
      </footer>
    </div>
  );
}
