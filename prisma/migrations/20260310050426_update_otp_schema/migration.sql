/*
  Warnings:

  - Added the required column `userData` to the `EmailOTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailOTP" ADD COLUMN     "userData" JSONB NOT NULL;
