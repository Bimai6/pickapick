import mongoose from "mongoose";
import fs from "fs";
import https from "https";
import app from "./app.js";
import { buildPokemonList } from "./services/pokeapiService.js";
import { initSocket } from "./socket/index.js";

const httpsPort = process.env.PORT;

async function startServer() {
  try {
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log("Connected to MongoDB Atlas");

    const pokemons = await buildPokemonList();
    console.log(`Loaded ${pokemons.length} Pokémon`);

    app.locals.pokemons = pokemons;

    const httpsOptions = {
      key: fs.readFileSync("./src/certs/key.pem"),  
      cert: fs.readFileSync("./src/certs/cert.pem"),
    };

    const httpsServer = https.createServer(httpsOptions, app);

    initSocket(httpsServer);

    httpsServer.listen(httpsPort, () => {
      console.log(`Server is running https://localhost:${httpsPort}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
