import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Pokemon } from '@/src/app/types/pokemon';
import { fetchPokemonByName } from '@/src/app/services/clientApi';

export function useSearchPokemon() {
  const [search, setSearch] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSearch = async () => {
    setSearchMessage('');
    if (!search.trim()) {
      setSearchMessage('Please enter a Pokémon name.');
      return;
    }
    setSearchLoading(true);
    try {
      const searchData = await queryClient.fetchQuery<Pokemon, Error>({
        queryKey: ['searchPokemon', search],
        queryFn: () => fetchPokemonByName(search.trim()),
      });

      // searchData is now correctly typed as Pokemon | undefined
      if (searchData?.id) {
        router.push(`/pokemon/details/${searchData.id}`);
      } else {
        setSearchMessage('Sorry, there is no such Pokémon.');
      }
    } catch (error) {
      setSearchMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setSearchLoading(false);
    }
  };

  return { search, setSearch, searchMessage, handleSearch, searchLoading };
}