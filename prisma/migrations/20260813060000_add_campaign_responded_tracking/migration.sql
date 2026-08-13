-- Add campaign response tracking
ALTER TABLE "Campaign"
ADD COLUMN "respondedCount" INTEGER NOT NULL DEFAULT 0;

-- Add recipient response timestamp
ALTER TABLE "CampaignRecipient"
ADD COLUMN "respondedAt" TIMESTAMP(3);