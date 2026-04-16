import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { getOptionalAccountContext } from "@/server/auth/context";
import { getOnboardingSnapshot } from "@/server/onboarding/service";
import { routes } from "@/lib/routes";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const context = await getOptionalAccountContext();

  if (!context) {
    redirect(routes.login);
  }

  const onboarding = await getOnboardingSnapshot(context.accountId);

  if (!onboarding) {
    redirect(routes.dashboard);
  }

  if (onboarding.nextStep === "ready_for_qr") {
    redirect(routes.dashboard);
  }

  return <OnboardingForm initialOnboarding={onboarding} />;
}
