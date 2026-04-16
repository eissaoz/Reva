import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { authServer } from "@/server/auth/neon-auth";
import { getOptionalAccountContext } from "@/server/auth/context";
import { getOnboardingSnapshot } from "@/server/onboarding/service";
import { routes } from "@/lib/routes";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const context = await getOptionalAccountContext();

  if (context) {
    const onboarding = await getOnboardingSnapshot(context.accountId);
    const showOnboardingNav = onboarding ? onboarding.nextStep !== "ready_for_qr" : true;

    return <AppShell showOnboardingNav={showOnboardingNav}>{children}</AppShell>;
  }

  const { data: session } = await authServer.getSession();

  if (!session?.user?.id || !session.user.email) {
    redirect(routes.login);
  }

  redirect(routes.signup);
}
