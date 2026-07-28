import { Router } from "express"
import { optionalAuthMiddleware } from "../../middlewares/optionalAuth.middleware"
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  saveInvoice,
} from "../../controllers/invoice/invoice.controller"

export const invoiceRouter = Router()

invoiceRouter.post("/", optionalAuthMiddleware, createInvoice)

invoiceRouter.get("/", optionalAuthMiddleware, getInvoices)

invoiceRouter.get("/:id", optionalAuthMiddleware, getInvoice)

invoiceRouter.put("/:id", optionalAuthMiddleware, saveInvoice)

invoiceRouter.delete("/:id", optionalAuthMiddleware, deleteInvoice)
