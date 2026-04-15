import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { requireAccountContext, toErrorResponse } from "@/server/auth/context";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const context = await requireAccountContext();
    const account = await prisma.account.findUnique({
      where: {
        id: context.accountId,
      },
      select: {
        id: true,
        businessName: true,
        onboardingStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        appUserId: context.appUserId,
        neonAuthUserId: context.neonAuthUserId,
        email: context.email,
      },
      account,
    });
  } catch (error) {
    const failure = toErrorResponse(error);
    return NextResponse.json({ error: failure.message }, { status: failure.status });
  }
}
