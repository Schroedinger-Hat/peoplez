/*
  Warnings:

  - Added the required column `socialSecurityNumber` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('member', 'admin');

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "socialSecurityNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'member',
ADD COLUMN     "stripeCustomerId" TEXT;
