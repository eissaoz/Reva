import { NextResponse } from "next/server";
import { authServer } from "@/server/auth/neon-auth";
import { ensureProvisionedUser, ProvisioningError } from "@/server/auth/provision";
import { routes } from "@/lib/routes";
import { getClientIp } from "@/server/http/request";
import { rateLimitPolicies } from "@/server/rate-limit/config";
import { requireRateLimit, RateLimitExceededError, RateLimitStoreUnavailableError } from "@/server/rate-limit/service";

export const dynamic = "force-dynamic";

type SignUpPayload = {
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const ipAddress = getClientIp(request);

  try {
    const rateLimit = await requireRateLimit({
      key: `ip:${ipAddress}`,
      scope: "ip",
      endpoint: "auth:sign-up",
      policy: rateLimitPolicies.authMutation,
    });

    const body = (await request.json()) as SignUpPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const password = body.password;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
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
      });
    } catch (error) {
      if (error instanceof ProvisioningError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }

      return NextResponse.json({ error: "Account created, but business provisioning failed." }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      rateLimit: {
        limit: rateLimit.limit,
        remaining: rateLimit.remaining,
      },
    });
  } catch (error) {
    if (error instanceof RateLimitExceededError) {
      return NextResponse.json(
        {
          error: error.message,
          retryAfterSeconds: error.retryAfterSeconds,
          limit: error.limit,
          remaining: error.remaining,
        },
        { status: error.status },
      );
    }

    if (error instanceof RateLimitStoreUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
