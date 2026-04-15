import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/prisma";

type ProvisionInput = {
  neonAuthUserId: string;
  email: string;
  name?: string | null;
  businessName?: string | null;
};

type ProvisionResult = {
  userId: string;
  accountId: string;
  created: boolean;
};

export class ProvisioningError extends Error {
  readonly status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ProvisioningError";
    this.status = status;
  }
}

function deriveBusinessName(input: ProvisionInput) {
  const explicit = input.businessName?.trim();
  if (explicit) {
    return explicit;
  }

  const fromName = input.name?.trim();
  if (fromName) {
    return `${fromName} Business`;
  }

  const emailPrefix = input.email.split("@")[0]?.trim() || "Reva";
  return `${emailPrefix} Business`;
}

export async function ensureProvisionedUser(input: ProvisionInput): Promise<ProvisionResult> {
  const existingByNeonId = await prisma.user.findUnique({
    where: {
      neonAuthUserId: input.neonAuthUserId,
    },
    select: {
      id: true,
      accountId: true,
    },
  });

  if (existingByNeonId) {
    return {
      userId: existingByNeonId.id,
      accountId: existingByNeonId.accountId,
      created: false,
    };
  }

  const businessName = deriveBusinessName(input);

  try {
    return await prisma.$transaction(async (tx) => {
      const existingByEmail = await tx.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          accountId: true,
          neonAuthUserId: true,
        },
      });

      if (existingByEmail) {
        if (existingByEmail.neonAuthUserId !== input.neonAuthUserId) {
          throw new ProvisioningError("Email is already linked to another account", 409);
        }

        return {
          userId: existingByEmail.id,
          accountId: existingByEmail.accountId,
          created: false,
        };
      }

      const account = await tx.account.create({
        data: {
          businessName,
          onboardingStatus: "STARTED",
        },
      });

      const user = await tx.user.create({
        data: {
          accountId: account.id,
          neonAuthUserId: input.neonAuthUserId,
          email: input.email,
          fullName: input.name?.trim() || null,
        },
      });

      await tx.location.create({
        data: {
          accountId: account.id,
          name: "Main Location",
        },
      });

      return {
        userId: user.id,
        accountId: account.id,
        created: true,
      };
    });
  } catch (error) {
    if (error instanceof ProvisioningError) {
      throw error;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const recovered = await prisma.user.findUnique({
        where: {
          neonAuthUserId: input.neonAuthUserId,
        },
        select: {
          id: true,
          accountId: true,
        },
      });

      if (recovered) {
        return {
          userId: recovered.id,
          accountId: recovered.accountId,
          created: false,
        };
      }
    }

    throw error;
  }
}
