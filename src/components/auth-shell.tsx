import type { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { routes } from "@/lib/routes";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text-primary)]">
      <main className="relative flex flex-1 items-center justify-center px-6 py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(196,165,53,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-headline text-3xl font-extrabold tracking-tight">REVA<span className="text-[var(--gold)]">.</span></p>
            <ThemeToggle />
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-10">{children}</div>
        </div>
      </main>

      <footer className="px-6 py-8 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
        <p>© 2026 REVA. Caught privately. Praised publicly.</p>
        <div className="mt-4 flex items-center justify-center gap-6 text-[10px]">
          <Link href={routes.pricing}>Pricing</Link>
          <Link href={routes.contactSales}>Contact Sales</Link>
          <Link href={routes.login}>Sign In</Link>
        </div>
      </footer>
    </div>
  );
}
