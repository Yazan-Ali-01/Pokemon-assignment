export interface Type {
  name: string;
  url: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
}

export type DamageRelation = {
  name: string;
  url: string;
};


export type LanguageName = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

export type Pokemon = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

export type CategoryDetails = {
  damage_relations: {
    double_damage_from: DamageRelation[];
    double_damage_to: DamageRelation[];
    half_damage_from: DamageRelation[];
    half_damage_to: DamageRelation[];
    no_damage_from: DamageRelation[];
    no_damage_to: DamageRelation[];
  };
  game_indices: GameIndex[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  move_damage_class: {
    name: string;
    url: string;
  };
  moves: Move[];
  name: string;
  names: LanguageName[];
  past_damage_relations: any[]; // Use `any` if there's no specific structure for past_damage_relations
  pokemon: Pokemon[];
};

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  cries: any; // Replace 'any' with a specific type if known
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[]; // Replace 'any' with a specific type if known
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[]; // Replace 'any' with a specific type if known
  past_types: any[]; // Replace 'any' with a specific type if known
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  // Define the Ability type here
}

export interface Form {
  // Define the Form type here
}

export interface GameIndex {
  game_index: number;
  version: Version;
}

export interface Move {
  // Define the Move type here
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: VersionSprites;
}

export interface OtherSprites {
  dream_world: {
    front_default: string;
    front_female: string | null;
  };
  home: {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
  'official-artwork': {
    front_default: string;
  };
}

export interface VersionSprites {
  // Define versions sprites here, one for each game version
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Version {
  name: string;
  url: string;
}
