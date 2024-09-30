-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "Membership" ADD COLUMN     "membershipTemplateId" TEXT NOT NULL;
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_membershipTemplateId_fkey" FOREIGN KEY ("membershipTemplateId") REFERENCES "MembershipTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;