import dotenv from "dotenv";
import type { CorsOptions } from "cors";

dotenv.config();

if (!process.env.ALLOWED_ORIGINS) {
  throw new Error("❌ Missing ALLOWED_ORIGINS in environment variables");
}

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ CORS blocked: ${origin} is not allowed.`));
    }
  },
  credentials: true,
};
