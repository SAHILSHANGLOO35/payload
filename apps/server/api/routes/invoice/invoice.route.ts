import { Router } from "express"
import { optionalAuthMiddleware } from "../../middlewares/optionalAuth.middleware"
import {
  createInvoice,
  getInvoices,
} from "../../controllers/invoice/invoice.controller"

export const invoiceRouter = Router()

invoiceRouter.post("/", optionalAuthMiddleware, createInvoice)

invoiceRouter.get("/", optionalAuthMiddleware, getInvoices)

invoiceRouter.get("/:id", optionalAuthMiddleware)

invoiceRouter.put("/:id", optionalAuthMiddleware)

invoiceRouter.delete("/:id", optionalAuthMiddleware)
