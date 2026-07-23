import { Router } from "express"
import { optionalAuthMiddleware } from "../../middlewares/optionalAuth.middleware"
import {
  createInvoice,
  saveInvoice,
} from "../../controllers/invoice/invoice.controller"

export const invoiceRouter = Router()

invoiceRouter.post("/", optionalAuthMiddleware, createInvoice)

invoiceRouter.get("/", optionalAuthMiddleware)

invoiceRouter.get("/:id", optionalAuthMiddleware)

invoiceRouter.put("/:id", optionalAuthMiddleware, saveInvoice)

invoiceRouter.delete("/:id", optionalAuthMiddleware)
