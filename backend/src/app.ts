import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import api from "./routes/api.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import { corsOptions } from "./config/corsOptions.js";

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", api);
app.use("/pokemon", pokemonRouter);

app.get("/", (req, res) => res.send("Server is running"));

export default app;