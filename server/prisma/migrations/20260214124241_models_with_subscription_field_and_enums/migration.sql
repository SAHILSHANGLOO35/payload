/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('pending', 'paid', 'failed', 'expired', 'refunded', 'cancelled');

-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('fixed', 'percentage');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('free_trial', 'lifetime_access');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'free_trial',
    "freeInvoicesUsed" INTEGER NOT NULL DEFAULT 0,
    "hasLifetimeAccess" BOOLEAN NOT NULL DEFAULT false,
    "lifetimeAccessEmail" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_fields" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "invoice_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_company_details" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "logo" TEXT,
    "signature" TEXT,
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "invoice_company_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_company_details_metadata" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "invoiceCompanyDetailsId" TEXT NOT NULL,

    CONSTRAINT "invoice_company_details_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_client_details" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "invoice_client_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_client_details_metadata" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "invoiceClientDetailsId" TEXT NOT NULL,

    CONSTRAINT "invoice_client_details_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_details" (
    "id" TEXT NOT NULL,
    "theme" JSONB NOT NULL,
    "currency" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "paymentTerms" TEXT NOT NULL DEFAULT '',
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "invoice_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_billing_details" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ValueType" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "invoiceDetailsId" TEXT NOT NULL,

    CONSTRAINT "invoice_billing_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_metadata" (
    "id" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "terms" TEXT NOT NULL DEFAULT '',
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "invoice_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_payment_information" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "invoiceMetadataId" TEXT NOT NULL,

    CONSTRAINT "invoice_payment_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "paymentGateway" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "failureReason" TEXT,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_authId_key" ON "users"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "invoices_userId_idx" ON "invoices"("userId");

-- CreateIndex
CREATE INDEX "invoices_status_idx" ON "invoices"("status");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_fields_invoiceId_key" ON "invoice_fields"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_company_details_invoiceFieldId_key" ON "invoice_company_details"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "invoice_company_details_metadata_invoiceCompanyDetailsId_idx" ON "invoice_company_details_metadata"("invoiceCompanyDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_client_details_invoiceFieldId_key" ON "invoice_client_details"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "invoice_client_details_metadata_invoiceClientDetailsId_idx" ON "invoice_client_details_metadata"("invoiceClientDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_details_invoiceFieldId_key" ON "invoice_details"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "invoice_billing_details_invoiceDetailsId_idx" ON "invoice_billing_details"("invoiceDetailsId");

-- CreateIndex
CREATE INDEX "invoice_items_invoiceFieldId_idx" ON "invoice_items"("invoiceFieldId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_metadata_invoiceFieldId_key" ON "invoice_metadata"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "invoice_payment_information_invoiceMetadataId_idx" ON "invoice_payment_information"("invoiceMetadataId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_fields" ADD CONSTRAINT "invoice_fields_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_company_details" ADD CONSTRAINT "invoice_company_details_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "invoice_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_company_details_metadata" ADD CONSTRAINT "invoice_company_details_metadata_invoiceCompanyDetailsId_fkey" FOREIGN KEY ("invoiceCompanyDetailsId") REFERENCES "invoice_company_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_client_details" ADD CONSTRAINT "invoice_client_details_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "invoice_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_client_details_metadata" ADD CONSTRAINT "invoice_client_details_metadata_invoiceClientDetailsId_fkey" FOREIGN KEY ("invoiceClientDetailsId") REFERENCES "invoice_client_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_details" ADD CONSTRAINT "invoice_details_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "invoice_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_billing_details" ADD CONSTRAINT "invoice_billing_details_invoiceDetailsId_fkey" FOREIGN KEY ("invoiceDetailsId") REFERENCES "invoice_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "invoice_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_metadata" ADD CONSTRAINT "invoice_metadata_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "invoice_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_payment_information" ADD CONSTRAINT "invoice_payment_information_invoiceMetadataId_fkey" FOREIGN KEY ("invoiceMetadataId") REFERENCES "invoice_metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
