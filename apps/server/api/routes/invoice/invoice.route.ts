import { Router } from "express"
import { optionalAuthMiddleware } from "../../middlewares/optionalAuth.middleware"
import { createInvoice } from "../../controllers/invoice/invoice.controller"

export const invoiceRouter = Router()

invoiceRouter.post("/", optionalAuthMiddleware, createInvoice)
