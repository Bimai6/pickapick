export interface Pokemon {
  name: string;
  abilities: Ability[];
  cries: Cries;
  moves: Move[];
  sprites: Sprites;
  stats: Stat[];
  types: TypeSlot[];
  viability: number;
}

export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface Move {
  move: NamedAPIResource;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Sprites {
  front_default: string | null;
  back_default: string | null;
  front_shiny: string | null;
  back_shiny: string | null;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface TypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}
