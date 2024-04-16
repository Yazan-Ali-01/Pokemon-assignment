import { useQuery } from '@tanstack/react-query';

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ['pokemon-types'],
    queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });
};
