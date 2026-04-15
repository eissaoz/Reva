import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { getOptionalAccountContext } from "@/server/auth/context";
import { routes } from "@/lib/routes";

export const dynamic = "force-dynamic";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const context = await getOptionalAccountContext();

  if (context) {
    redirect(routes.dashboard);
  }

  return <AuthShell>{children}</AuthShell>;
}
