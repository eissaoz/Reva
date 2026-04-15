import { authApiHandler } from "@neondatabase/auth/next/server";

export const dynamic = "force-dynamic";

export const { GET, POST } = authApiHandler();
