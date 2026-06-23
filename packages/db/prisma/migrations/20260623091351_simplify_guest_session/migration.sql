/*
  Warnings:

  - You are about to drop the column `lastInvoiceId` on the `guest_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `usageCount` on the `guest_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guest_sessions" DROP COLUMN "lastInvoiceId",
DROP COLUMN "usageCount";
