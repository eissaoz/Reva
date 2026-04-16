-- CreateTable
CREATE TABLE "rate_limit_events" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rate_limit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rate_limit_events_key_endpoint_createdAt_idx" ON "rate_limit_events"("key", "endpoint", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "rate_limit_events_createdAt_idx" ON "rate_limit_events"("createdAt" DESC);
