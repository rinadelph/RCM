/*
  Warnings:

  - You are about to drop the column `googleAds` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gaViewId` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gscSiteUrl` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceAccountKey` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
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
INSERT INTO "new_Credential" ("accessToken", "clientId", "clientSecret", "id", "privateKey", "redirectUri", "refreshToken", "serviceId") SELECT "accessToken", "clientId", "clientSecret", "id", "privateKey", "redirectUri", "refreshToken", "serviceId" FROM "Credential";
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
    "updatedAt" DATETIME NOT NULL,
    "searchConsoleProperty" TEXT
);
INSERT INTO "new_Service" ("adsCustomerId", "apiKey", "apiSecret", "gaMeasurementId", "gaPropertyId", "id", "name", "searchConsoleProperty", "serviceType", "type") SELECT "adsCustomerId", "apiKey", "apiSecret", "gaMeasurementId", "gaPropertyId", "id", "name", "searchConsoleProperty", "serviceType", "type" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceAccountKey" TEXT NOT NULL,
    "gaViewId" TEXT NOT NULL,
    "gscSiteUrl" TEXT NOT NULL
);
INSERT INTO "new_Settings" ("id") SELECT "id" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
