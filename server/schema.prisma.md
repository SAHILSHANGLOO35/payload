# Prisma Schema Documentation

A comprehensive guide to the invoice management database schema with detailed explanations of models, relationships, and real-world usage.

---

## Table of Contents

1. [Configuration](#configuration)
2. [Enums](#enums)
3. [Models Overview](#models-overview)
4. [Model Details](#model-details)
   - [User](#user)
   - [Invoice](#invoice)
   - [InvoiceField](#invoicefield)
   - [InvoiceCompanyDetails](#invoicecompanydetails)
   - [InvoiceCompanyDetailsMetadata](#invoicecompanydetailsmetadata)
   - [InvoiceClientDetails](#invoiceclientdetails)
   - [InvoiceClientDetailsMetadata](#invoiceclientdetailsmetadata)
   - [InvoiceDetails](#invoicedetails)
   - [InvoiceBillingDetail](#invoicebillingdetail)
   - [InvoiceItem](#invoiceitem)
   - [InvoiceMetadata](#invoicemetadata)
   - [InvoicePaymentInformation](#invoicepaymentinformation)
5. [Database Relationships Summary](#database-relationships-summary)
6. [Frontend Implementation Guide](#frontend-implementation-guide)

---

## Configuration

### Prisma Client Generator

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
```

**Purpose:** Configures code generation for JavaScript/TypeScript environments. The generated client files are placed in `server/generated/prisma`.

### Database Connection

```prisma
datasource db {
  provider = "postgresql"
}
```

**Purpose:** Specifies PostgreSQL as the database provider. Prisma also supports MySQL, SQLite, MongoDB, and others.

---

## Enums

Enums provide predefined sets of allowed values to ensure data consistency.

### InvoiceStatus

Defines possible states for an invoice throughout its lifecycle.

```prisma
enum InvoiceStatus {
  pending   // Created but not yet paid
  paid      // Fully paid
  failed    // Payment attempt failed
  expired   // Due date passed without payment
  refunded  // Payment has been refunded
  cancelled // Invoice has been cancelled
}
```

**Real-world analogy:** A dropdown menu in an invoice management system showing "Pending", "Paid", etc.

**Frontend usage:** Display invoice status with color coding (green for paid, red for failed), enable/disable actions based on status, filter invoice lists.

### ValueType

Defines how numeric values should be interpreted for calculations.

```prisma
enum ValueType {
  fixed      // Static amount (e.g., $10 off)
  percentage // Percentage of another amount (e.g., 10% off)
}
```

**Real-world analogy:** Choosing between "$10 OFF" (fixed) or "10% OFF" (percentage) when applying discounts.

**Frontend usage:** Calculate totals correctly, display amounts with appropriate symbols ("$10" vs "10%"), provide appropriate input fields.

---

## Models Overview

The schema consists of 12 interconnected models organized hierarchically:

```
User
└── Invoice (one-to-many)
    └── InvoiceField (one-to-one)
        ├── InvoiceCompanyDetails (one-to-one)
        │   └── InvoiceCompanyDetailsMetadata (one-to-many)
        ├── InvoiceClientDetails (one-to-one)
        │   └── InvoiceClientDetailsMetadata (one-to-many)
        ├── InvoiceDetails (one-to-one)
        │   └── InvoiceBillingDetail (one-to-many)
        ├── InvoiceMetadata (one-to-one)
        │   └── InvoicePaymentInformation (one-to-many)
        └── InvoiceItem (one-to-many)
```

---

## Model Details

### User

Represents application users with authentication and profile information.

```prisma
model User {
  id         String    @id @default(uuid())
  authId     String    @unique
  email      String    @unique
  fullName   String?
  avatarUrl  String?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  invoices   Invoice[]

  @@map("users")
}
```

**Fields:**

- `id`: Primary key (UUID)
- `authId`: Unique identifier from external auth provider (e.g., Google OAuth)
- `email`: User's unique email address
- `fullName`: Optional full name
- `avatarUrl`: Optional profile picture URL
- `createdAt`: Record creation timestamp
- `updatedAt`: Last update timestamp (auto-managed)

**Relationships:**

- **One-to-many with Invoice:** A user can create multiple invoices

**Frontend usage:** Fetch all invoices for logged-in user to display on dashboard or invoice list.

**Example table data:**

| id          | authId     | email             | fullName  | avatarUrl                | createdAt            | updatedAt            |
| ----------- | ---------- | ----------------- | --------- | ------------------------ | -------------------- | -------------------- |
| uuid-user-1 | google-123 | alice@example.com | Alice Doe | http://example.com/a.png | 2026-01-01T10:00:00Z | 2026-01-05T14:30:00Z |
| uuid-user-2 | fb-456     | bob@example.com   | Bob Smith | null                     | 2026-01-02T11:00:00Z | 2026-01-02T11:00:00Z |

---

### Invoice

Stores high-level invoice records with status and payment tracking.

```prisma
model Invoice {
  id           String         @id @default(uuid())
  status       InvoiceStatus  @default(pending)
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  paidAt       DateTime?

  userId       String
  user         User           @relation(fields: [userId], references: [id], onDelete: Cascade)

  invoiceField InvoiceField?

  @@index([userId])
  @@index([status])
  @@map("invoices")
}
```

**Fields:**

- `id`: Primary key (UUID)
- `status`: Current invoice status (enum)
- `createdAt`: Invoice creation timestamp
- `updatedAt`: Last update timestamp
- `paidAt`: Optional payment completion timestamp

**Relationships:**

- **Many-to-one with User:** Each invoice belongs to one user (foreign key: `userId`)
- **One-to-one with InvoiceField:** Contains detailed invoice content
- **Cascade delete:** Deleting a user removes all their invoices

**Indexes:**

- `userId`: Fast queries by user
- `status`: Fast queries by invoice status

**Frontend usage:** Display user's name on invoice, automatically remove invoices when user is deleted.

**Example table data:**

| id           | status  | createdAt            | updatedAt            | paidAt               | userId      |
| ------------ | ------- | -------------------- | -------------------- | -------------------- | ----------- |
| uuid-inv-101 | paid    | 2026-02-10T10:00:00Z | 2026-02-10T15:00:00Z | 2026-02-10T14:50:00Z | uuid-user-1 |
| uuid-inv-102 | pending | 2026-02-14T09:00:00Z | 2026-02-14T09:00:00Z | null                 | uuid-user-1 |

---

### InvoiceField

Central container aggregating all customizable sections of an invoice.

```prisma
model InvoiceField {
  id             String                   @id @default(uuid())
  invoiceId      String                   @unique
  invoice        Invoice                  @relation(fields: [invoiceId], references: [id], onDelete: Cascade)

  companyDetails InvoiceCompanyDetails?
  clientDetails  InvoiceClientDetails?
  invoiceDetails InvoiceDetails?
  metadata       InvoiceMetadata?
  items          InvoiceItem[]

  @@map("invoice_fields")
}
```

**Purpose:** Maintains one-to-one link with parent Invoice while organizing detailed content into logical sections.

**Relationships:**

- **One-to-one with Invoice:** Unique foreign key ensures single detail set per invoice
- **One-to-one with multiple detail models:** Company, client, invoice details, metadata
- **One-to-many with InvoiceItem:** Multiple line items per invoice
- **Cascade delete:** Removing invoice deletes all related fields

**Frontend usage:** Hub for creating/editing invoice content. Fetch this record to access all invoice sections.

**Example table data:**

| id              | invoiceId    |
| --------------- | ------------ |
| uuid-invfield-A | uuid-inv-101 |
| uuid-invfield-B | uuid-inv-102 |

---

### InvoiceCompanyDetails

Stores sender's company information for a specific invoice.

```prisma
model InvoiceCompanyDetails {
  id             String                           @id @default(uuid())
  name           String
  address        String
  logo           String?
  signature      String?

  invoiceFieldId String                           @unique
  invoiceField   InvoiceField                     @relation(fields: [invoiceFieldId], references: [id], onDelete: Cascade)

  metadata       InvoiceCompanyDetailsMetadata[]

  @@map("invoice_company_details")
}
```

**Fields:**

- `name`: Company name
- `address`: Company address
- `logo`: Optional logo URL
- `signature`: Optional signature image URL

**Relationships:**

- **One-to-one with InvoiceField:** Unique per invoice
- **One-to-many with InvoiceCompanyDetailsMetadata:** Extensible custom fields
- **Cascade delete:** Removing InvoiceField deletes company details

**Frontend usage:** Display company information in invoice header/footer.

**Example table data:**

| id             | name       | address             | logo                       | signature | invoiceFieldId  |
| -------------- | ---------- | ------------------- | -------------------------- | --------- | --------------- |
| uuid-compdet-X | Sender Co. | 1 Main St, Sometown | http://sender.com/logo.png | null      | uuid-invfield-A |

---

### InvoiceCompanyDetailsMetadata

Flexible key-value storage for additional company information.

```prisma
model InvoiceCompanyDetailsMetadata {
  id                      String                 @id @default(uuid())
  label                   String
  value                   String

  invoiceCompanyDetailsId String
  companyDetails          InvoiceCompanyDetails  @relation(fields: [invoiceCompanyDetailsId], references: [id], onDelete: Cascade)

  @@index([invoiceCompanyDetailsId])
  @@map("invoice_company_details_metadata")
}
```

**Purpose:** Store non-standard fields like VAT ID, bank account, tax registration numbers.

**Fields:**

- `label`: Field name (e.g., "VAT ID", "Bank Name")
- `value`: Field value

**Relationships:**

- **Many-to-one with InvoiceCompanyDetails:** Multiple metadata entries per company detail set
- **Cascade delete:** Removing company details deletes all metadata

**Frontend usage:** Render dynamic list of additional company details.

**Example table data:**

| id             | label    | value          | invoiceCompanyDetailsId |
| -------------- | -------- | -------------- | ----------------------- |
| uuid-compmet-1 | VAT ID   | GB123456789    | uuid-compdet-X          |
| uuid-compmet-2 | Bank Acc | 1234-5678-9012 | uuid-compdet-X          |

---

### InvoiceClientDetails

Stores recipient's client information for a specific invoice.

```prisma
model InvoiceClientDetails {
  id             String                         @id @default(uuid())
  name           String
  address        String

  invoiceFieldId String                         @unique
  invoiceField   InvoiceField                   @relation(fields: [invoiceFieldId], references: [id], onDelete: Cascade)

  metadata       InvoiceClientDetailsMetadata[]

  @@map("invoice_client_details")
}
```

**Fields:**

- `name`: Client's name
- `address`: Client's address

**Relationships:**

- **One-to-one with InvoiceField:** Unique per invoice
- **One-to-many with InvoiceClientDetailsMetadata:** Extensible custom fields
- **Cascade delete:** Removing InvoiceField deletes client details

**Frontend usage:** Display client information in invoice recipient section.

**Example table data:**

| id            | name          | address               | invoiceFieldId  |
| ------------- | ------------- | --------------------- | --------------- |
| uuid-clidet-Y | Recipient Co. | 456 Oak Ave, Big City | uuid-invfield-A |

---

### InvoiceClientDetailsMetadata

Flexible key-value storage for additional client information.

```prisma
model InvoiceClientDetailsMetadata {
  id                     String                @id @default(uuid())
  label                  String
  value                  String

  invoiceClientDetailsId String
  clientDetails          InvoiceClientDetails  @relation(fields: [invoiceClientDetailsId], references: [id], onDelete: Cascade)

  @@index([invoiceClientDetailsId])
  @@map("invoice_client_details_metadata")
}
```

**Purpose:** Store non-standard fields like client tax ID, contact person, department.

**Fields:**

- `label`: Field name (e.g., "Client Tax ID", "Contact Person")
- `value`: Field value

**Relationships:**

- **Many-to-one with InvoiceClientDetails:** Multiple metadata entries per client detail set
- **Cascade delete:** Removing client details deletes all metadata

**Frontend usage:** Render dynamic list of additional client details.

**Example table data:**

| id            | label         | value       | invoiceClientDetailsId |
| ------------- | ------------- | ----------- | ---------------------- |
| uuid-climet-1 | Client Tax ID | C-987654321 | uuid-clidet-Y          |

---

### InvoiceDetails

Stores administrative and display-related invoice properties.

```prisma
model InvoiceDetails {
  id             String                   @id @default(uuid())
  theme          Json
  currency       String
  prefix         String
  serialNumber   String
  date           DateTime
  dueDate        DateTime?
  paymentTerms   String                   @default("")

  invoiceFieldId String                   @unique
  invoiceField   InvoiceField             @relation(fields: [invoiceFieldId], references: [id], onDelete: Cascade)

  billingDetails InvoiceBillingDetail[]

  @@map("invoice_details")
}
```

**Fields:**

- `theme`: JSON styling data (e.g., `{"color": "blue", "font": "Arial"}`)
- `currency`: Currency code (e.g., "USD", "EUR")
- `prefix`: Invoice number prefix (e.g., "INV-")
- `serialNumber`: Unique serial number (e.g., "001", "2026-005")
- `date`: Invoice issue date
- `dueDate`: Optional payment due date
- `paymentTerms`: Payment terms (e.g., "Net 30", "Due on receipt")

**Relationships:**

- **One-to-one with InvoiceField:** Unique per invoice
- **One-to-many with InvoiceBillingDetail:** Multiple billing adjustments
- **Cascade delete:** Removing InvoiceField deletes invoice details

**Frontend usage:** Populate invoice header (number, dates, terms), apply dynamic styling from theme JSON.

**Example table data:**

| id            | theme            | currency | prefix | serialNumber | date       | dueDate    | paymentTerms | invoiceFieldId  |
| ------------- | ---------------- | -------- | ------ | ------------ | ---------- | ---------- | ------------ | --------------- |
| uuid-invdet-Z | {"color":"blue"} | USD      | INV-   | 001          | 2026-02-10 | 2026-03-10 | Net 30       | uuid-invfield-A |

---

### InvoiceBillingDetail

Represents billing adjustments like taxes, discounts, and shipping.

```prisma
model InvoiceBillingDetail {
  id               String         @id @default(uuid())
  label            String
  type             ValueType
  value            Decimal        @db.Decimal(10, 2)

  invoiceDetailsId String
  invoiceDetails   InvoiceDetails @relation(fields: [invoiceDetailsId], references: [id], onDelete: Cascade)

  @@index([invoiceDetailsId])
  @@map("invoice_billing_details")
}
```

**Fields:**

- `label`: Adjustment name (e.g., "Sales Tax", "Discount")
- `type`: `fixed` or `percentage` (ValueType enum)
- `value`: Decimal value with precision (10 digits total, 2 after decimal)

**Relationships:**

- **Many-to-one with InvoiceDetails:** Multiple adjustments per invoice
- **Cascade delete:** Removing invoice details deletes all billing details

**Frontend usage:** List adjustments below items, calculate their effect on subtotal and grand total.

**Example table data:**

| id             | label     | type       | value | invoiceDetailsId |
| -------------- | --------- | ---------- | ----- | ---------------- |
| uuid-billdet-1 | Sales Tax | percentage | 0.08  | uuid-invdet-Z    |
| uuid-billdet-2 | Discount  | fixed      | 15.00 | uuid-invdet-Z    |

---

### InvoiceItem

Represents individual products or services listed on an invoice.

```prisma
model InvoiceItem {
  id             String       @id @default(uuid())
  name           String
  description    String
  quantity       Int
  unitPrice      Decimal      @db.Decimal(10, 2)

  invoiceFieldId String
  invoiceField   InvoiceField @relation(fields: [invoiceFieldId], references: [id], onDelete: Cascade)

  @@index([invoiceFieldId])
  @@map("invoice_items")
}
```

**Fields:**

- `name`: Item/service name
- `description`: Item/service description
- `quantity`: Number of units
- `unitPrice`: Price per unit (Decimal precision)

**Relationships:**

- **Many-to-one with InvoiceField:** Multiple items per invoice
- **Cascade delete:** Removing InvoiceField deletes all items

**Frontend usage:** Render line items in invoice table, calculate row subtotals (quantity × unitPrice), contribute to grand total.

**Example table data:**

| id             | name       | description  | quantity | unitPrice | invoiceFieldId  |
| -------------- | ---------- | ------------ | -------- | --------- | --------------- |
| uuid-invitem-1 | Web Design | Landing page | 1        | 500.00    | uuid-invfield-A |
| uuid-invitem-2 | Hosting    | 1 year       | 1        | 120.00    | uuid-invfield-A |

---

### InvoiceMetadata

Stores general notes and terms for an invoice.

```prisma
model InvoiceMetadata {
  id                 String                        @id @default(uuid())
  notes              String                        @default("")
  terms              String                        @default("")

  invoiceFieldId     String                        @unique
  invoiceField       InvoiceField                  @relation(fields: [invoiceFieldId], references: [id], onDelete: Cascade)

  paymentInformation InvoicePaymentInformation[]

  @@map("invoice_metadata")
}
```

**Fields:**

- `notes`: General comments or notes (default: empty string)
- `terms`: Terms and conditions (default: empty string)

**Relationships:**

- **One-to-one with InvoiceField:** Unique per invoice
- **One-to-many with InvoicePaymentInformation:** Extensible payment instructions
- **Cascade delete:** Removing InvoiceField deletes metadata

**Frontend usage:** Display "Notes" and "Terms & Conditions" sections on invoice.

**Example table data:**

| id             | notes         | terms                   | invoiceFieldId  |
| -------------- | ------------- | ----------------------- | --------------- |
| uuid-invmeta-1 | Thanks for... | Payment due in 30 days. | uuid-invfield-A |

---

### InvoicePaymentInformation

Flexible key-value storage for payment instructions.

```prisma
model InvoicePaymentInformation {
  id                String           @id @default(uuid())
  label             String
  value             String

  invoiceMetadataId String
  metadata          InvoiceMetadata  @relation(fields: [invoiceMetadataId], references: [id], onDelete: Cascade)

  @@index([invoiceMetadataId])
  @@map("invoice_payment_information")
}
```

**Purpose:** Store bank details, crypto addresses, wire transfer instructions, PayPal information.

**Fields:**

- `label`: Field name (e.g., "Bank Name", "Account Number", "Bitcoin Address")
- `value`: Field value

**Relationships:**

- **Many-to-one with InvoiceMetadata:** Multiple payment details per invoice
- **Cascade delete:** Removing invoice metadata deletes all payment information

**Frontend usage:** Display dynamic list of payment instructions.

**Example table data:**

| id             | label       | value      | invoiceMetadataId |
| -------------- | ----------- | ---------- | ----------------- |
| uuid-payinfo-1 | Bank Name   | MyBank     | uuid-invmeta-1    |
| uuid-payinfo-2 | Account No. | 1234567890 | uuid-invmeta-1    |

---

## Database Relationships Summary

### Cascade Deletion Chain

When a **User** is deleted:

1. All **Invoices** are deleted
2. For each Invoice, **InvoiceField** is deleted
3. For each InvoiceField:
   - **InvoiceCompanyDetails** and its **Metadata** are deleted
   - **InvoiceClientDetails** and its **Metadata** are deleted
   - **InvoiceDetails** and its **BillingDetails** are deleted
   - **InvoiceMetadata** and its **PaymentInformation** are deleted
   - All **InvoiceItems** are deleted

### Key Indexes

- `User`: None (lookups typically by unique authId or email)
- `Invoice`: `userId`, `status`
- `InvoiceCompanyDetailsMetadata`: `invoiceCompanyDetailsId`
- `InvoiceClientDetailsMetadata`: `invoiceClientDetailsId`
- `InvoiceBillingDetail`: `invoiceDetailsId`
- `InvoiceItem`: `invoiceFieldId`
- `InvoicePaymentInformation`: `invoiceMetadataId`

---

## Frontend Implementation Guide

### Creating a New Invoice

1. Create `User` (if not exists)
2. Create `Invoice` linked to User
3. Create `InvoiceField` linked to Invoice
4. Create detail records linked to InvoiceField:
   - `InvoiceCompanyDetails` + metadata entries
   - `InvoiceClientDetails` + metadata entries
   - `InvoiceDetails` + billing detail entries
   - `InvoiceMetadata` + payment information entries
   - Multiple `InvoiceItem` records

### Displaying an Invoice

1. Fetch `Invoice` by ID (includes User via relation)
2. Fetch `InvoiceField` by `invoiceId`
3. Fetch all related details using `invoiceFieldId`:
   - Company details with metadata
   - Client details with metadata
   - Invoice details with billing details
   - Metadata with payment information
   - All items
4. Calculate totals:
   - Item subtotal: Sum of (quantity × unitPrice) for all items
   - Apply billing adjustments (taxes, discounts)
   - Display grand total

### Status Updates

Update `Invoice.status` and optionally `Invoice.paidAt`:

- `pending` → `paid`: Set `paidAt` to current timestamp
- `pending` → `failed`: Leave `paidAt` null
- `paid` → `refunded`: Keep original `paidAt`, update status

### Example Prisma Queries

#### Fetch Invoice with All Details

```typescript
const invoice = await prisma.invoice.findUnique({
  where: { id: invoiceId },
  include: {
    user: true,
    invoiceField: {
      include: {
        companyDetails: {
          include: { metadata: true },
        },
        clientDetails: {
          include: { metadata: true },
        },
        invoiceDetails: {
          include: { billingDetails: true },
        },
        metadata: {
          include: { paymentInformation: true },
        },
        items: true,
      },
    },
  },
});
```

#### Create Complete Invoice

```typescript
const invoice = await prisma.invoice.create({
  data: {
    userId: user.id,
    status: "pending",
    invoiceField: {
      create: {
        companyDetails: {
          create: {
            name: "My Company",
            address: "123 Main St",
            logo: "https://...",
            metadata: {
              create: [
                { label: "VAT ID", value: "GB123456789" },
                { label: "Bank Account", value: "1234-5678" },
              ],
            },
          },
        },
        clientDetails: {
          create: {
            name: "Client Corp",
            address: "456 Oak Ave",
            metadata: {
              create: [{ label: "Client Tax ID", value: "C-987654" }],
            },
          },
        },
        invoiceDetails: {
          create: {
            theme: { color: "blue" },
            currency: "USD",
            prefix: "INV-",
            serialNumber: "001",
            date: new Date(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            paymentTerms: "Net 30",
            billingDetails: {
              create: [
                { label: "Sales Tax", type: "percentage", value: 0.08 },
                { label: "Discount", type: "fixed", value: 15.0 },
              ],
            },
          },
        },
        metadata: {
          create: {
            notes: "Thank you for your business!",
            terms: "Payment due within 30 days.",
            paymentInformation: {
              create: [
                { label: "Bank Name", value: "MyBank" },
                { label: "Account Number", value: "1234567890" },
              ],
            },
          },
        },
        items: {
          create: [
            {
              name: "Web Design",
              description: "Landing page design",
              quantity: 1,
              unitPrice: 500.0,
            },
            {
              name: "Hosting",
              description: "1 year hosting",
              quantity: 1,
              unitPrice: 120.0,
            },
          ],
        },
      },
    },
  },
});
```

#### Update Invoice Status

```typescript
const updatedInvoice = await prisma.invoice.update({
  where: { id: invoiceId },
  data: {
    status: "paid",
    paidAt: new Date(),
  },
});
```

#### Get All Invoices for a User

```typescript
const userInvoices = await prisma.invoice.findMany({
  where: { userId: user.id },
  include: {
    invoiceField: {
      include: {
        clientDetails: true,
        invoiceDetails: true,
      },
    },
  },
  orderBy: { createdAt: "desc" },
});
```

---

## Best Practices

### Data Integrity

1. **Always use transactions** for creating complete invoices to ensure all-or-nothing operations
2. **Validate foreign keys** before creating related records
3. **Use cascade deletes carefully** - understand the deletion chain before removing users or invoices

### Performance Optimization

1. **Use indexes** for frequently queried fields (already defined in schema)
2. **Limit includes** when fetching invoices - only include necessary relations
3. **Paginate** invoice lists for users with many invoices
4. **Cache** currency symbols and theme data on the frontend

### Security

1. **Validate user ownership** before allowing invoice operations
2. **Sanitize inputs** for all string fields, especially metadata values
3. **Validate decimal values** to prevent overflow or negative values where inappropriate
4. **Rate limit** invoice creation to prevent abuse

### Schema Evolution

1. **Use migrations** for all schema changes
2. **Add optional fields first**, make them required in subsequent migrations if needed
3. **Version your API** when making breaking changes to the data structure
4. **Backup data** before running migrations that delete or transform data

---

This schema provides a flexible, normalized structure for comprehensive invoice management with extensibility through metadata models and proper data integrity through cascading deletes.
