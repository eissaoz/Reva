import { createAuthServer } from "@neondatabase/auth/next/server";

if (!process.env.NEON_AUTH_BASE_URL) {
  throw new Error("Missing NEON_AUTH_BASE_URL environment variable");
}

export const authServer = createAuthServer();
