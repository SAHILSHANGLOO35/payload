import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import "./lib/supabase.ts"
import { authRouter } from "./api/routes/auth/auth.route.ts"
import { invoiceRouter } from "./api/routes/invoice/invoice.route.ts"

const app = express()
app.set("query parser", "extended")
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/v1/google", authRouter)
app.use("/api/v1/invoices", invoiceRouter)

async function main() {
  try {
    console.log("DB connected successfully.")

    app.listen(process.env.PORT, () => {
      console.log(`Server started on ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("Error", error)
    process.exit(1)
  }
}

main()
