-- Add default values for existing records
UPDATE "GoogleService" SET
  name = 'Unnamed Service',
  type = 'unknown',
  status = 'Not verified',
  updatedAt = CURRENT_TIMESTAMP
WHERE name IS NULL OR type IS NULL OR status IS NULL OR updatedAt IS NULL;

-- Add the new columns
ALTER TABLE "GoogleService" ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Unnamed Service';
ALTER TABLE "GoogleService" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'unknown';
ALTER TABLE "GoogleService" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'Not verified';
ALTER TABLE "GoogleService" ADD COLUMN "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;