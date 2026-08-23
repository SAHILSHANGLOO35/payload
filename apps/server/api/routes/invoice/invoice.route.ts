import { Router } from "express"
import { optionalAuthMiddleware } from "../../middlewares/optionalAuth.middleware"
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  saveInvoice,
  updateInvoiceStatus,
  uploadInvoiceAssets,
} from "../../controllers/invoice/invoice.controller"
import { invoiceAssetUpload } from "../../middlewares/upload.middleware"

export const invoiceRouter = Router()

invoiceRouter.post("/", optionalAuthMiddleware, createInvoice)

invoiceRouter.get("/", optionalAuthMiddleware, getInvoices)

invoiceRouter.put("/:id/status", optionalAuthMiddleware, updateInvoiceStatus)

invoiceRouter.put(
  "/:id/assets",
  optionalAuthMiddleware,
  invoiceAssetUpload,
  uploadInvoiceAssets
)

invoiceRouter.get("/:id", optionalAuthMiddleware, getInvoice)

invoiceRouter.put("/:id", optionalAuthMiddleware, saveInvoice)

invoiceRouter.delete("/:id", optionalAuthMiddleware, deleteInvoice)
