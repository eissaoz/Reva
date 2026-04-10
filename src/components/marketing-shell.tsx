import type { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { routes } from "@/lib/routes";

type MarketingShellProps = {
  children: ReactNode;
};

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href={routes.pricing} className="font-headline text-xl font-extrabold tracking-tight">
            REVA<span className="text-[var(--gold)]">.</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
            <Link href={routes.pricing}>Pricing</Link>
            <Link href={routes.contactSales}>Contact Sales</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={routes.login} className="rounded-md border border-[var(--border-strong)] px-3 py-2 text-sm font-semibold">
              Sign In
            </Link>
            <Link href={routes.signup} className="rounded-md bg-[var(--gold)] px-3 py-2 text-sm font-bold text-[var(--black)]">
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-12">{children}</main>
    </div>
  );
}
