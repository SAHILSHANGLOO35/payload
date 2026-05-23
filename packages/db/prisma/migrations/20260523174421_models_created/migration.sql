-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('pending', 'paid', 'failed', 'expired', 'refunded', 'cancelled');

-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('fixed', 'percentage');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_sessions" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "userId" TEXT,
    "guestSessionId" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_data" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "invoice_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "invoiceDataId" TEXT NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_details" (
    "id" TEXT NOT NULL,
    "theme" JSONB NOT NULL,
    "currency" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "invoiceDataId" TEXT NOT NULL,

    CONSTRAINT "invoice_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_company_details" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "logo" TEXT,
    "signature" TEXT,
    "invoiceDataId" TEXT NOT NULL,

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
    "invoiceDataId" TEXT NOT NULL,

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
CREATE TABLE "invoice_billing_details" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ValueType" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "invoiceDetailsId" TEXT NOT NULL,

    CONSTRAINT "invoice_billing_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_metadata" (
    "id" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "terms" TEXT NOT NULL DEFAULT '',
    "invoiceDataId" TEXT NOT NULL,

    CONSTRAINT "invoice_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_payment_details" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "invoiceMetadataId" TEXT NOT NULL,

    CONSTRAINT "invoice_payment_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_authId_key" ON "users"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "guest_sessions_guestId_key" ON "guest_sessions"("guestId");

-- CreateIndex
CREATE INDEX "invoices_userId_idx" ON "invoices"("userId");

-- CreateIndex
CREATE INDEX "invoices_guestSessionId_idx" ON "invoices"("guestSessionId");

-- CreateIndex
CREATE INDEX "invoices_status_idx" ON "invoices"("status");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_data_invoiceId_key" ON "invoice_data"("invoiceId");

-- CreateIndex
CREATE INDEX "invoice_items_invoiceDataId_idx" ON "invoice_items"("invoiceDataId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_details_invoiceDataId_key" ON "invoice_details"("invoiceDataId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_company_details_invoiceDataId_key" ON "invoice_company_details"("invoiceDataId");

-- CreateIndex
CREATE INDEX "invoice_company_details_metadata_invoiceCompanyDetailsId_idx" ON "invoice_company_details_metadata"("invoiceCompanyDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_client_details_invoiceDataId_key" ON "invoice_client_details"("invoiceDataId");

-- CreateIndex
CREATE INDEX "invoice_client_details_metadata_invoiceClientDetailsId_idx" ON "invoice_client_details_metadata"("invoiceClientDetailsId");

-- CreateIndex
CREATE INDEX "invoice_billing_details_invoiceDetailsId_idx" ON "invoice_billing_details"("invoiceDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_metadata_invoiceDataId_key" ON "invoice_metadata"("invoiceDataId");

-- CreateIndex
CREATE INDEX "invoice_payment_details_invoiceMetadataId_idx" ON "invoice_payment_details"("invoiceMetadataId");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_guestSessionId_fkey" FOREIGN KEY ("guestSessionId") REFERENCES "guest_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_data" ADD CONSTRAINT "invoice_data_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceDataId_fkey" FOREIGN KEY ("invoiceDataId") REFERENCES "invoice_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_details" ADD CONSTRAINT "invoice_details_invoiceDataId_fkey" FOREIGN KEY ("invoiceDataId") REFERENCES "invoice_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_company_details" ADD CONSTRAINT "invoice_company_details_invoiceDataId_fkey" FOREIGN KEY ("invoiceDataId") REFERENCES "invoice_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_company_details_metadata" ADD CONSTRAINT "invoice_company_details_metadata_invoiceCompanyDetailsId_fkey" FOREIGN KEY ("invoiceCompanyDetailsId") REFERENCES "invoice_company_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_client_details" ADD CONSTRAINT "invoice_client_details_invoiceDataId_fkey" FOREIGN KEY ("invoiceDataId") REFERENCES "invoice_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_client_details_metadata" ADD CONSTRAINT "invoice_client_details_metadata_invoiceClientDetailsId_fkey" FOREIGN KEY ("invoiceClientDetailsId") REFERENCES "invoice_client_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_billing_details" ADD CONSTRAINT "invoice_billing_details_invoiceDetailsId_fkey" FOREIGN KEY ("invoiceDetailsId") REFERENCES "invoice_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_metadata" ADD CONSTRAINT "invoice_metadata_invoiceDataId_fkey" FOREIGN KEY ("invoiceDataId") REFERENCES "invoice_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_payment_details" ADD CONSTRAINT "invoice_payment_details_invoiceMetadataId_fkey" FOREIGN KEY ("invoiceMetadataId") REFERENCES "invoice_metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
