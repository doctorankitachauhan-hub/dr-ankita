/*
  Warnings:

  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "age" SET DEFAULT '18',
ALTER COLUMN "age" SET DATA TYPE TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'OTHER',
ALTER COLUMN "weight" SET DATA TYPE TEXT;
