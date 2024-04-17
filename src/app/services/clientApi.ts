import { ApiResponse, CategoryDetails, PokemonDetails } from "@/src/app/types/pokemon";

export async function fetchTypes(): Promise<ApiResponse> {
  return fetchFromApi('https://pokeapi.co/api/v2/type/');
}

export async function fetchCategoryDetails(categoryId: number): Promise<CategoryDetails> {
  return fetchFromApi(`https://pokeapi.co/api/v2/type/${categoryId}/`);
}

export async function fetchPokemonDetails(pokemonId: number | string): Promise<PokemonDetails> {
  return fetchFromApi(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
}

async function fetchFromApi(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const fetchPokemonByName = async (pokemonName: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon with that name');
  }

  return response.json();
}



