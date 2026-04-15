import { NextResponse } from "next/server";
import { authServer } from "@/server/auth/neon-auth";
import { ensureProvisionedUser, ProvisioningError } from "@/server/auth/provision";
import { routes } from "@/lib/routes";

export const dynamic = "force-dynamic";

type SignInPayload = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export async function POST(request: Request) {
  const body = (await request.json()) as SignInPayload;
  const email = body.email?.trim();
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const result = await authServer.signIn.email({
    email,
    password,
    rememberMe: body.rememberMe ?? true,
    callbackURL: new URL(routes.dashboard, request.url).toString(),
  });

  if (result.error) {
    return NextResponse.json({ error: result.error.message ?? "Unable to sign in." }, { status: 401 });
  }

  let sessionUser: { id: string; email: string; name?: string | null } | null = result.data?.user
    ? {
        id: result.data.user.id,
        email: result.data.user.email,
        name: result.data.user.name,
      }
    : null;

  if (!sessionUser?.id || !sessionUser.email) {
    const sessionResult = await authServer.getSession();
    sessionUser = sessionResult.data?.user
      ? {
          id: sessionResult.data.user.id,
          email: sessionResult.data.user.email,
          name: sessionResult.data.user.name,
        }
      : null;
  }

  if (!sessionUser?.id || !sessionUser.email) {
    return NextResponse.json({ error: "Signed in, but session user details are unavailable." }, { status: 502 });
  }

  try {
    await ensureProvisionedUser({
      neonAuthUserId: sessionUser.id,
      email: sessionUser.email,
      name: sessionUser.name,
    });
  } catch (error) {
    if (error instanceof ProvisioningError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Signed in, but account provisioning failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
