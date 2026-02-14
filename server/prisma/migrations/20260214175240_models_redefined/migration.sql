/*
  Warnings:

  - You are about to drop the column `freeInvoicesUsed` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hasLifetimeAccess` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lifetimeAccessEmail` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionTier` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "freeInvoicesUsed",
DROP COLUMN "hasLifetimeAccess",
DROP COLUMN "lifetimeAccessEmail",
DROP COLUMN "subscriptionTier";

-- DropTable
DROP TABLE "payments";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "SubscriptionTier";
