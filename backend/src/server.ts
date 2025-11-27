import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { buildPokemonList } from "./services/pokeapiService.js";
import api from "./routes/api.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import { corsOptions } from "./config/corsOptions.js";

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", api);
app.use("/pokemon", pokemonRouter)

app.get("/", (req, res) => res.send("Server is running"));

const port = Number(process.env.PORT ?? 3000);

async function startServer() {
  try {
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log("Connected to MongoDB Atlas");

    const pokemons = await buildPokemonList();
    console.log(`Loaded ${pokemons.length} Pokémon`);

    app.locals.pokemons = pokemons;

    app.listen(port, () => {
      console.log(`Server is running http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
