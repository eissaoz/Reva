-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('STARTED', 'PROFILE_COMPLETED', 'GOOGLE_LINKED', 'QR_READY', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TaskSourceType" AS ENUM ('COMPLAINT', 'REVIEW_PROMPT', 'MANUAL');

-- CreateEnum
CREATE TYPE "PromptDisposition" AS ENUM ('IMPROVEMENT', 'POSITIVE');

-- CreateEnum
CREATE TYPE "FeedbackCategory" AS ENUM ('SERVICE', 'WAIT_TIME', 'PRODUCT_QUALITY', 'BILLING', 'CLEANLINESS', 'OTHER');

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "businessName" TEXT NOT NULL,
    "onboardingStatus" "OnboardingStatus" NOT NULL DEFAULT 'STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "neonAuthUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "googleBusinessLink" TEXT,
    "googleReviewLink" TEXT,
    "googlePlaceId" TEXT,
    "googlePlaceName" TEXT,
    "googleFormattedAddress" TEXT,
    "googleRating" DECIMAL(2,1),
    "googleReviewCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_codes" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "qrSvg" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "scanCount" INTEGER NOT NULL DEFAULT 0,
    "lastScannedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_sessions" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "qrCodeId" UUID,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "feedbackSessionId" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "category" "FeedbackCategory",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaints" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "ratingId" UUID NOT NULL,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'OPEN',
    "summary" TEXT,
    "ownerNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_prompts" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "ratingId" UUID NOT NULL,
    "disposition" "PromptDisposition" NOT NULL,
    "destinationUrl" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_captures" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "feedbackSessionId" UUID NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "consented" BOOLEAN NOT NULL DEFAULT false,
    "consentedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_captures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "sourceType" "TaskSourceType" NOT NULL,
    "complaintId" UUID,
    "reviewPromptId" UUID,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',
    "assignedUserId" UUID,
    "dueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_neonAuthUserId_key" ON "users"("neonAuthUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_accountId_createdAt_idx" ON "users"("accountId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "locations_accountId_key" ON "locations"("accountId");

-- CreateIndex
CREATE INDEX "locations_accountId_idx" ON "locations"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "qr_codes_slug_key" ON "qr_codes"("slug");

-- CreateIndex
CREATE INDEX "qr_codes_accountId_createdAt_idx" ON "qr_codes"("accountId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "qr_codes_locationId_createdAt_idx" ON "qr_codes"("locationId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "feedback_sessions_accountId_startedAt_idx" ON "feedback_sessions"("accountId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "feedback_sessions_locationId_startedAt_idx" ON "feedback_sessions"("locationId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "feedback_sessions_qrCodeId_startedAt_idx" ON "feedback_sessions"("qrCodeId", "startedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "ratings_feedbackSessionId_key" ON "ratings"("feedbackSessionId");

-- CreateIndex
CREATE INDEX "ratings_accountId_createdAt_idx" ON "ratings"("accountId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "ratings_locationId_createdAt_idx" ON "ratings"("locationId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "ratings_score_createdAt_idx" ON "ratings"("score", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "complaints_ratingId_key" ON "complaints"("ratingId");

-- CreateIndex
CREATE INDEX "complaints_accountId_status_createdAt_idx" ON "complaints"("accountId", "status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "complaints_locationId_status_createdAt_idx" ON "complaints"("locationId", "status", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "review_prompts_ratingId_key" ON "review_prompts"("ratingId");

-- CreateIndex
CREATE INDEX "review_prompts_accountId_createdAt_idx" ON "review_prompts"("accountId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "review_prompts_locationId_createdAt_idx" ON "review_prompts"("locationId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "contact_captures_feedbackSessionId_key" ON "contact_captures"("feedbackSessionId");

-- CreateIndex
CREATE INDEX "contact_captures_accountId_createdAt_idx" ON "contact_captures"("accountId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "contact_captures_locationId_createdAt_idx" ON "contact_captures"("locationId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "tasks_complaintId_key" ON "tasks"("complaintId");

-- CreateIndex
CREATE INDEX "tasks_accountId_status_priority_createdAt_idx" ON "tasks"("accountId", "status", "priority", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "tasks_locationId_status_createdAt_idx" ON "tasks"("locationId", "status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "tasks_reviewPromptId_idx" ON "tasks"("reviewPromptId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_sessions" ADD CONSTRAINT "feedback_sessions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_sessions" ADD CONSTRAINT "feedback_sessions_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_sessions" ADD CONSTRAINT "feedback_sessions_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "qr_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_feedbackSessionId_fkey" FOREIGN KEY ("feedbackSessionId") REFERENCES "feedback_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "ratings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_prompts" ADD CONSTRAINT "review_prompts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_prompts" ADD CONSTRAINT "review_prompts_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_prompts" ADD CONSTRAINT "review_prompts_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "ratings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_captures" ADD CONSTRAINT "contact_captures_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_captures" ADD CONSTRAINT "contact_captures_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_captures" ADD CONSTRAINT "contact_captures_feedbackSessionId_fkey" FOREIGN KEY ("feedbackSessionId") REFERENCES "feedback_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "complaints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_reviewPromptId_fkey" FOREIGN KEY ("reviewPromptId") REFERENCES "review_prompts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddCheckConstraint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_score_range_check" CHECK ("score" BETWEEN 1 AND 5);

-- AddCheckConstraint
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_scan_count_nonnegative_check" CHECK ("scanCount" >= 0);

-- AddCheckConstraint
ALTER TABLE "contact_captures" ADD CONSTRAINT "contact_captures_consent_timestamp_check" CHECK (("consented" = false) OR ("consentedAt" IS NOT NULL));

-- AddCheckConstraint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_source_reference_check" CHECK (
  (
    "sourceType" = 'COMPLAINT'::"TaskSourceType"
    AND "complaintId" IS NOT NULL
    AND "reviewPromptId" IS NULL
  ) OR (
    "sourceType" = 'REVIEW_PROMPT'::"TaskSourceType"
    AND "reviewPromptId" IS NOT NULL
    AND "complaintId" IS NULL
  ) OR (
    "sourceType" = 'MANUAL'::"TaskSourceType"
    AND "reviewPromptId" IS NULL
    AND "complaintId" IS NULL
  )
);
