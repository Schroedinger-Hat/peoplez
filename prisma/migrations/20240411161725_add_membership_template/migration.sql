-- CreateEnum
CREATE TYPE "PricePeriod" AS ENUM ('Yearly', 'Monthly');

-- CreateEnum
CREATE TYPE "PriceUnit" AS ENUM ('EUR', 'USD');

-- CreateTable
CREATE TABLE "MembershipTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "features" TEXT[],
    "priceAmount" INTEGER NOT NULL,
    "pricePeriod" "PricePeriod" NOT NULL DEFAULT 'Yearly',
    "priceUnit" "PriceUnit" NOT NULL DEFAULT 'EUR',
    "stripePriceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipTemplate_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "MembershipTemplate_stripePriceId_key" ON "MembershipTemplate"("stripePriceId");
