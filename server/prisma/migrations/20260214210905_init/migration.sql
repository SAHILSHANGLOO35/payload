/*
  Warnings:

  - You are about to drop the `invoice_billing_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_client_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_client_details_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_company_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_company_details_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_fields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_payment_information` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoice_billing_details" DROP CONSTRAINT "invoice_billing_details_invoiceDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_client_details" DROP CONSTRAINT "invoice_client_details_invoiceFieldId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_client_details_metadata" DROP CONSTRAINT "invoice_client_details_metadata_invoiceClientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_company_details" DROP CONSTRAINT "invoice_company_details_invoiceFieldId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_company_details_metadata" DROP CONSTRAINT "invoice_company_details_metadata_invoiceCompanyDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_details" DROP CONSTRAINT "invoice_details_invoiceFieldId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_fields" DROP CONSTRAINT "invoice_fields_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_items" DROP CONSTRAINT "invoice_items_invoiceFieldId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_metadata" DROP CONSTRAINT "invoice_metadata_invoiceFieldId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_payment_information" DROP CONSTRAINT "invoice_payment_information_invoiceMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- DropTable
DROP TABLE "invoice_billing_details";

-- DropTable
DROP TABLE "invoice_client_details";

-- DropTable
DROP TABLE "invoice_client_details_metadata";

-- DropTable
DROP TABLE "invoice_company_details";

-- DropTable
DROP TABLE "invoice_company_details_metadata";

-- DropTable
DROP TABLE "invoice_details";

-- DropTable
DROP TABLE "invoice_fields";

-- DropTable
DROP TABLE "invoice_items";

-- DropTable
DROP TABLE "invoice_metadata";

-- DropTable
DROP TABLE "invoice_payment_information";

-- DropTable
DROP TABLE "invoices";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceField" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "InvoiceField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceCompanyDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "logo" TEXT,
    "signature" TEXT,
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "InvoiceCompanyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceCompanyDetailsMetadata" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "invoiceCompanyDetailsId" TEXT NOT NULL,

    CONSTRAINT "InvoiceCompanyDetailsMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceClientDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "InvoiceClientDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceClientDetailsMetadata" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "invoiceClientDetailsId" TEXT NOT NULL,

    CONSTRAINT "InvoiceClientDetailsMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceDetails" (
    "id" TEXT NOT NULL,
    "theme" JSONB NOT NULL,
    "currency" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "paymentTerms" TEXT NOT NULL DEFAULT '',
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "InvoiceDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceBillingDetail" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ValueType" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "invoiceDetailsId" TEXT NOT NULL,

    CONSTRAINT "InvoiceBillingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceMetadata" (
    "id" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "terms" TEXT NOT NULL DEFAULT '',
    "invoiceFieldId" TEXT NOT NULL,

    CONSTRAINT "InvoiceMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoicePaymentInformation" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "invoiceMetadataId" TEXT NOT NULL,

    CONSTRAINT "InvoicePaymentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Invoice_userId_idx" ON "Invoice"("userId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceField_invoiceId_key" ON "InvoiceField"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceCompanyDetails_invoiceFieldId_key" ON "InvoiceCompanyDetails"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "InvoiceCompanyDetailsMetadata_invoiceCompanyDetailsId_idx" ON "InvoiceCompanyDetailsMetadata"("invoiceCompanyDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceClientDetails_invoiceFieldId_key" ON "InvoiceClientDetails"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "InvoiceClientDetailsMetadata_invoiceClientDetailsId_idx" ON "InvoiceClientDetailsMetadata"("invoiceClientDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceDetails_invoiceFieldId_key" ON "InvoiceDetails"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "InvoiceBillingDetail_invoiceDetailsId_idx" ON "InvoiceBillingDetail"("invoiceDetailsId");

-- CreateIndex
CREATE INDEX "InvoiceItem_invoiceFieldId_idx" ON "InvoiceItem"("invoiceFieldId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceMetadata_invoiceFieldId_key" ON "InvoiceMetadata"("invoiceFieldId");

-- CreateIndex
CREATE INDEX "InvoicePaymentInformation_invoiceMetadataId_idx" ON "InvoicePaymentInformation"("invoiceMetadataId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceField" ADD CONSTRAINT "InvoiceField_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceCompanyDetails" ADD CONSTRAINT "InvoiceCompanyDetails_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "InvoiceField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceCompanyDetailsMetadata" ADD CONSTRAINT "InvoiceCompanyDetailsMetadata_invoiceCompanyDetailsId_fkey" FOREIGN KEY ("invoiceCompanyDetailsId") REFERENCES "InvoiceCompanyDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceClientDetails" ADD CONSTRAINT "InvoiceClientDetails_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "InvoiceField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceClientDetailsMetadata" ADD CONSTRAINT "InvoiceClientDetailsMetadata_invoiceClientDetailsId_fkey" FOREIGN KEY ("invoiceClientDetailsId") REFERENCES "InvoiceClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetails" ADD CONSTRAINT "InvoiceDetails_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "InvoiceField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceBillingDetail" ADD CONSTRAINT "InvoiceBillingDetail_invoiceDetailsId_fkey" FOREIGN KEY ("invoiceDetailsId") REFERENCES "InvoiceDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "InvoiceField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceMetadata" ADD CONSTRAINT "InvoiceMetadata_invoiceFieldId_fkey" FOREIGN KEY ("invoiceFieldId") REFERENCES "InvoiceField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicePaymentInformation" ADD CONSTRAINT "InvoicePaymentInformation_invoiceMetadataId_fkey" FOREIGN KEY ("invoiceMetadataId") REFERENCES "InvoiceMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
