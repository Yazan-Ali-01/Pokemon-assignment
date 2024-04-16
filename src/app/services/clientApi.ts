import { ApiResponse } from "@/src/app/types/api";

export async function fetchTypes(): Promise<ApiResponse> {
  const response = await fetch('https://pokeapi.co/api/v2/type/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<ApiResponse>;
}

export const fetchCategoryData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch category details');
  }
  return response.json();
}

export const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch category details');
  }
  return response.json();
}



