import type { Pokemon } from "../types/pokemon.ts";
import pLimit from "p-limit";

const API = "https://pokeapi.co/api/v2/pokemon";

const limit = pLimit(20);

const fetchPokemon = async (name: string, url: string): Promise<Pokemon | null> => {
  try {
    const res = await fetch(`${API}/${name}`);

    if (!res.ok) {
      const altRes = await fetch(url);
      if(!altRes.ok){
        const text = await altRes.text();
        console.error(`Error fetching ${name}: ${res.status} ${text}`);
        return null;
      }
    }

    const data = await res.json();

    return {
      name: data.name,
      abilities: data.abilities,
      cries: data.cries,
      moves: data.moves,
      sprites: data.sprites,
      stats: data.stats,
      types: data.types,
      viability: 1, 
    };
  } catch (err) {
    console.error(`Fetch failed for ${name}:`, err);
    return null;
  }
};

export const buildPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const listRes = await fetch(`${API}?limit=2000`);
    if (!listRes.ok) {
      const text = await listRes.text();
      throw new Error(`Failed to fetch Pokémon list: ${listRes.status} ${text}`);
    }

    const listData = await listRes.json();
    const pokemonsList = listData.results as { name: string; url: string }[];

    console.log(`Found ${pokemonsList.length} Pokémon.`);

    const tasks = pokemonsList.map(p => limit(() => fetchPokemon(p.name, p.url)));

    const fullList = await Promise.all(tasks);

    const validList = fullList.filter(Boolean) as Pokemon[];

    console.log(`Successfully fetched ${validList.length} Pokémon.`);

    return validList;
  } catch (err) {
    console.error("Error building Pokémon list:", err);
    return [];
  }
};
