/*
  Warnings:

  - Made the column `serviceType` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "googleAccessToken" TEXT;
ALTER TABLE "User" ADD COLUMN "googleRefreshToken" TEXT;
ALTER TABLE "User" ADD COLUMN "googleTokenExpiry" DATETIME;

-- CreateTable
CREATE TABLE "AnalyticsData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "pageViews" INTEGER NOT NULL,
    "events" TEXT NOT NULL,
    "topPages" TEXT NOT NULL,
    "users" TEXT NOT NULL,
    "userAcquisition" TEXT NOT NULL,
    "userBehavior" TEXT NOT NULL,
    "topDomains" TEXT NOT NULL,
    "topPagesViews" TEXT NOT NULL,
    "worstPerformingPages" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "googleAds" TEXT
);

-- CreateTable
CREATE TABLE "OAuthCredential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "redirectUri" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "clientId" TEXT,
    "clientSecret" TEXT,
    "redirectUri" TEXT,
    "clientEmail" TEXT,
    "privateKey" TEXT,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "expiryDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Credential_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Credential" ("accessToken", "clientEmail", "createdAt", "expiryDate", "id", "privateKey", "refreshToken", "serviceId", "updatedAt") SELECT "accessToken", "clientEmail", "createdAt", "expiryDate", "id", "privateKey", "refreshToken", "serviceId", "updatedAt" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
CREATE UNIQUE INDEX "Credential_serviceId_key" ON "Credential"("serviceId");
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "gaMeasurementId" TEXT,
    "gaPropertyId" TEXT,
    "adsCustomerId" TEXT,
    "apiKey" TEXT,
    "apiSecret" TEXT,
    "hasCredentials" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Service" ("apiKey", "apiSecret", "createdAt", "gaMeasurementId", "gaPropertyId", "hasCredentials", "id", "name", "serviceType", "type", "updatedAt", "verified") SELECT "apiKey", "apiSecret", "createdAt", "gaMeasurementId", "gaPropertyId", "hasCredentials", "id", "name", "serviceType", "type", "updatedAt", "verified" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
