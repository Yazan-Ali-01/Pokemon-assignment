import { useQueries } from '@tanstack/react-query';
import { fetchPokemonDetails } from '@/src/app/services/clientApi';

export function usePokemonDetails(pokemonArray: { pokemon: { name: string; url: string; } }[]) {
  return useQueries({
    queries: pokemonArray.map(pokemon => ({
      queryKey: ['pokemonDetails', pokemon.pokemon.name],
      queryFn: () => fetchPokemonDetailsFromUrl(pokemon.pokemon.url),
      enabled: !!pokemon.pokemon.url,
    })),
  });
}

function fetchPokemonDetailsFromUrl(url: string) {
  const pokemonId = extractIdFromUrl(url);
  return fetchPokemonDetails(pokemonId);
}

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  if (!match) throw new Error('Invalid URL format');
  return parseInt(match[1], 10);
}
