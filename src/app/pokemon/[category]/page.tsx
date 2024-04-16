'use client'
import React from 'react';

import { useQueries, useQuery } from "@tanstack/react-query";
import { CategoryDetails, PokemonDetails, Type } from "@/src/app/types/api";
import { fetchCategoryData, fetchPokemonDetails, fetchTypes } from '@/src/app/services/clientApi';

interface TypesData {
  results: Type[];
}

export default function Category({ params }: { params: { category: string } }) {

  const { category } = params

  const { data: typesData, error: typesError } = useQuery<TypesData, Error>({
    queryKey: ['types'],
    queryFn: fetchTypes,
    staleTime: Infinity,
  });

  const categoryUrl = typesData?.results.find(type => type.name === category)?.url;


  const { data: categoryData, isLoading } = useQuery<CategoryDetails, Error>({
    queryKey: ['categoryData', category],
    queryFn: () => fetchCategoryData(categoryUrl!),
    enabled: !!categoryUrl
  });

  const pokemonQueries = useQueries({
    queries: categoryData?.pokemon.map((p) => ({
      queryKey: ['pokemonDetails', p.pokemon.name],
      queryFn: () => fetchPokemonDetails(p.pokemon.url),
      enabled: !!categoryData // Only run queries if categoryData is loaded
    })) || []
  });

  if (isLoading) return <p>Loading...</p>;
  if (typesError) return <p>Error: {typesError.message}</p>;

  return (
    <div>
      <h1>Category: {category}</h1>
      <ul>
        {pokemonQueries.map((query, index) => {
          if (query.isLoading) return <li key={index}>Loading...</li>;
          if (query.error) return <li key={index}>Error: {query.error.message}</li>;

          const pokemonDetails: PokemonDetails = query.data;
          const spriteUrl = pokemonDetails.sprites.other.dream_world.front_default;

          return (
            <li key={pokemonDetails.name}>
              <h2>{pokemonDetails.name}</h2>
              <img src={spriteUrl} alt={`${pokemonDetails.name} sprite`} />
            </li>
          );
        })}
      </ul>
    </div>

  );
}
