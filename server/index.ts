import express from "express";
import { authRouter } from "./api/routes/auth/auth.route";
import "./lib/supabase";

const app = express();
app.use(express.json());

app.use("/api/v1/google", authRouter);

async function main() {
  try {
    console.log("DB connected successfully.");

    app.listen(process.env.PORT, () => {
      console.log(`Server started on ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
}

main();
