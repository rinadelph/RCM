-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "serviceType" TEXT,
    "gaMeasurementId" TEXT,
    "gaPropertyId" TEXT,
    "apiKey" TEXT,
    "apiSecret" TEXT,
    "hasCredentials" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Service" ("apiKey", "apiSecret", "createdAt", "gaMeasurementId", "gaPropertyId", "hasCredentials", "id", "name", "serviceType", "type", "updatedAt") SELECT "apiKey", "apiSecret", "createdAt", "gaMeasurementId", "gaPropertyId", "hasCredentials", "id", "name", "serviceType", "type", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
