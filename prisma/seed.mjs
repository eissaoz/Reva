import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.contactCapture.deleteMany();
  await prisma.reviewPrompt.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.feedbackSession.deleteMany();
  await prisma.qrCode.deleteMany();
  await prisma.user.deleteMany();
  await prisma.location.deleteMany();
  await prisma.account.deleteMany();

  const account = await prisma.account.create({
    data: {
      businessName: "Spice Route Kitchen",
      onboardingStatus: "QR_READY",
      users: {
        create: {
          neonAuthUserId: "seed-owner-auth-id",
          email: "owner@spiceroute.test",
          fullName: "Seed Owner",
        },
      },
      locations: {
        create: {
          name: "Spice Route Kitchen - Main Branch",
          googleBusinessLink: "https://maps.google.com/?cid=seed",
          googleReviewLink: "https://g.page/r/Cm.../review",
          googlePlaceId: "seed-place-id",
          googlePlaceName: "Spice Route Kitchen",
          googleFormattedAddress: "Nairobi, Kenya",
          googleRating: "4.3",
          googleReviewCount: 147,
        },
      },
    },
    include: {
      locations: true,
      users: true,
    },
  });

  const location = account.locations[0];

  const qrCodes = await Promise.all(
    ["table-1", "table-7", "front-desk"].map((label) =>
      prisma.qrCode.create({
        data: {
          accountId: account.id,
          locationId: location.id,
          label,
          slug: `seed-${label}`,
          qrSvg: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' fill='white'/><text x='10' y='60' font-size='10'>${label}</text></svg>`,
        },
      }),
    ),
  );

  const lowSession = await prisma.feedbackSession.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      qrCodeId: qrCodes[1].id,
      ipHash: "seed-ip-low",
      userAgent: "seed-agent",
    },
  });

  const lowRating = await prisma.rating.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      feedbackSessionId: lowSession.id,
      score: 2,
      comment: "Food was cold and service slow",
      category: "SERVICE",
    },
  });

  const complaint = await prisma.complaint.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      ratingId: lowRating.id,
      summary: "Customer reported slow service and cold meal.",
      status: "OPEN",
    },
  });

  await prisma.task.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      sourceType: "COMPLAINT",
      complaintId: complaint.id,
      title: "Follow up on 2-star complaint",
      details: "Call customer and offer recovery voucher.",
      priority: "HIGH",
      status: "OPEN",
      assignedUserId: account.users[0].id,
    },
  });

  const neutralSession = await prisma.feedbackSession.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      qrCodeId: qrCodes[2].id,
      ipHash: "seed-ip-neutral",
      userAgent: "seed-agent",
    },
  });

  const neutralRating = await prisma.rating.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      feedbackSessionId: neutralSession.id,
      score: 3,
      comment: "Good food, but service could be faster.",
      category: "WAIT_TIME",
    },
  });

  await prisma.reviewPrompt.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      ratingId: neutralRating.id,
      disposition: "IMPROVEMENT",
      destinationUrl: location.googleReviewLink ?? "https://g.page/r/Cm.../review",
    },
  });

  const highSession = await prisma.feedbackSession.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      qrCodeId: qrCodes[0].id,
      ipHash: "seed-ip-high",
      userAgent: "seed-agent",
    },
  });

  const highRating = await prisma.rating.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      feedbackSessionId: highSession.id,
      score: 5,
      comment: "Excellent experience and friendly staff.",
      category: "PRODUCT_QUALITY",
    },
  });

  await prisma.reviewPrompt.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      ratingId: highRating.id,
      disposition: "POSITIVE",
      destinationUrl: location.googleReviewLink ?? "https://g.page/r/Cm.../review",
      clickedAt: new Date(),
    },
  });

  await prisma.contactCapture.create({
    data: {
      accountId: account.id,
      locationId: location.id,
      feedbackSessionId: lowSession.id,
      phoneNumber: "+254700000001",
      consented: true,
      consentedAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
