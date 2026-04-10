"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { appNav, routes } from "@/lib/routes";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] bg-[var(--bg-card)] p-4 lg:flex lg:flex-col">
        <div className="mb-8 px-2 py-4">
          <p className="font-headline text-2xl font-black tracking-tight">REVA<span className="text-[var(--gold)]">.</span></p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">The Stoic Curator</p>
        </div>

        <nav className="flex-1 space-y-1">
          {appNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "border border-[var(--border)] bg-[var(--bg)] font-semibold text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg)]"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 space-y-3">
          <Link
            href={routes.resolveComplaint}
            className="block rounded-lg bg-[var(--gold)] px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-[var(--black)]"
          >
            Resolve Complaint
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)] backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--text-muted)]">REVA</span>
              <span className="material-symbols-outlined text-xs text-[var(--text-muted)]">chevron_right</span>
              <span className="font-semibold">{appNav.find((n) => n.href === pathname)?.label ?? "Workspace"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href={routes.contactSales} className="rounded-md border border-[var(--border-strong)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                Contact Sales
              </Link>
              <Link href={routes.resolveComplaint} className="rounded-md bg-[var(--gold)] px-3 py-2 text-xs font-bold text-[var(--black)]">
                Resolve Complaint
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
