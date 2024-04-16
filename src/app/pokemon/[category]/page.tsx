'use client'
import React from 'react';

import { useQueries, useQuery } from "@tanstack/react-query";
import { CategoryDetails, PokemonDetails, Type } from "@/src/app/types/api";
import { fetchCategoryData, fetchPokemonDetails, fetchTypes } from '@/src/app/services/clientApi';
import Image from 'next/image';

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
    <div className='mx-48'>
      <h1 className='text-center font-bold text-sky-400 text-3xl mb-8 uppercase'>{category} pokemons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonQueries.map((query, index) => {
          if (query.isLoading) return <div key={index} className="col-span-1">Loading...</div>;
          if (query.error) return <div key={index} className="col-span-1">Error: {query.error.message}</div>;

          const pokemonDetails: PokemonDetails = query.data;
          const spriteUrl = pokemonDetails.sprites.other.dream_world.front_default || "https://fakeimg.pl/600x400/cccccc/ff0000?text=Image+Unavailable";

          return (
            <div key={pokemonDetails.name} className="card bg-base-200 shadow-xl pb-2">
              <figure className="px-10 pt-10  flex justify-center items-center  min-h-[60%]">
                <div className='relative h-32 w-32'>
                  <Image fill src={spriteUrl} alt={`${pokemonDetails.name} sprite`} className="rounded-xl" />
                </div>
              </figure>
              <div className="card-body items-center text-center space-y-3">
                <h2 className="card-title text-white">{pokemonDetails.name}</h2>
                {/* Display additional Pokemon details here if needed */}
                <div className="card-actions">
                  <button className="btn text-cyan-400 bg-slate-900">View More</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
}
