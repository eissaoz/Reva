import { NextResponse } from "next/server";
import { authServer } from "@/server/auth/neon-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const result = await authServer.signOut();

  if (result.error) {
    return NextResponse.json({ error: result.error.message ?? "Unable to sign out." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
