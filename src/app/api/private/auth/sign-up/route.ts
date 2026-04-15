import { NextResponse } from "next/server";
import { authServer } from "@/server/auth/neon-auth";
import { ensureProvisionedUser, ProvisioningError } from "@/server/auth/provision";
import { routes } from "@/lib/routes";

export const dynamic = "force-dynamic";

type SignUpPayload = {
  name?: string;
  businessName?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as SignUpPayload;
  const name = body.name?.trim();
  const businessName = body.businessName?.trim();
  const email = body.email?.trim();
  const password = body.password;

  if (!name || !businessName || !email || !password) {
    return NextResponse.json({ error: "Name, business name, email, and password are required." }, { status: 400 });
  }

  const result = await authServer.signUp.email({
    name,
    email,
    password,
    callbackURL: new URL(routes.dashboard, request.url).toString(),
  });

  if (result.error) {
    return NextResponse.json({ error: result.error.message ?? "Unable to create account." }, { status: 400 });
  }

  const neonUser = result.data?.user;

  if (!neonUser?.id || !neonUser.email) {
    return NextResponse.json({ error: "Account created, but session user details are unavailable." }, { status: 502 });
  }

  try {
    await ensureProvisionedUser({
      neonAuthUserId: neonUser.id,
      email: neonUser.email,
      name: neonUser.name,
      businessName,
    });
  } catch (error) {
    if (error instanceof ProvisioningError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Account created, but business provisioning failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
