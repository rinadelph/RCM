/*
  Warnings:

  - You are about to drop the column `clientEmail` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `privateKey` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `hasCredentials` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Service` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT,
    "clientSecret" TEXT,
    "redirectUri" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "Credential_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Credential" ("accessToken", "clientId", "clientSecret", "id", "redirectUri", "refreshToken", "serviceId") SELECT "accessToken", "clientId", "clientSecret", "id", "redirectUri", "refreshToken", "serviceId" FROM "Credential";
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
    "searchConsoleProperty" TEXT,
    "apiKey" TEXT,
    "apiSecret" TEXT
);
INSERT INTO "new_Service" ("adsCustomerId", "apiKey", "apiSecret", "gaMeasurementId", "gaPropertyId", "id", "name", "searchConsoleProperty", "serviceType", "type") SELECT "adsCustomerId", "apiKey", "apiSecret", "gaMeasurementId", "gaPropertyId", "id", "name", "searchConsoleProperty", "serviceType", "type" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE UNIQUE INDEX "Service_serviceType_name_key" ON "Service"("serviceType", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
