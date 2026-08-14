-- CreateEnum
CREATE TYPE "ContactSource" AS ENUM ('MANUAL', 'WHATSAPP');

-- AlterTable
ALTER TABLE "Contact"
ADD COLUMN "source" "ContactSource" NOT NULL DEFAULT 'MANUAL';
