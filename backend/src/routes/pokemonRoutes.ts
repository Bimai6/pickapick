import express from "express";
import type { Pokemon } from "../types/pokemon.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/", (req, res) => {
  const pokemons = req.app.locals.pokemons as Pokemon[];

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 50);

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    page,
    limit,
    total: pokemons.length,
    results: pokemons.slice(start, end),
  });
});

pokemonRouter.get("/:name", (req, res) => {
  const pokemons = req.app.locals.pokemons as Pokemon[];
  const { name } = req.params;

  const pokemon = pokemons.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (!pokemon) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  res.json(pokemon);
});

export default pokemonRouter