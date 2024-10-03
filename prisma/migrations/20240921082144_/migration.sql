-- AlterTable
ALTER TABLE "Credential" ADD COLUMN "accessToken" TEXT;
ALTER TABLE "Credential" ADD COLUMN "expiryDate" DATETIME;
ALTER TABLE "Credential" ADD COLUMN "refreshToken" TEXT;
