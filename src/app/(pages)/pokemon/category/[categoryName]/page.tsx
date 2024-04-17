'use client'
import React, { useMemo, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { CategoryDetails, Type } from "@/src/app/types/pokemon";
import { fetchCategoryDetails, fetchTypes } from '@/src/app/services/clientApi';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePokemonDetails } from '@/src/app/hooks/usePokemonDetails';

interface TypesData {
  results: Type[];
}

export default function Category({ params }: { params: { categoryName: string } }) {
  const { categoryName } = params;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const { data: typesData, error: typesError } = useQuery<TypesData, Error>({
    queryKey: ['types'],
    queryFn: fetchTypes,
    staleTime: Infinity,
  });

  const categoryUrl = typesData?.results.find(type => type.name === categoryName)?.url;
  const categoryIdNumber = categoryUrl ? parseInt(categoryUrl.split('/').slice(-2)[0]) : null;
  console.log(typesData);


  const { data: categoryData, isLoading: isLoadingCategory } = useQuery<CategoryDetails, Error>({
    queryKey: ['categoryData', categoryName],
    queryFn: () => fetchCategoryDetails(categoryIdNumber!),
    enabled: !!categoryUrl
  });

  const currentPageData = useMemo(() => {
    return categoryData?.pokemon.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) || [];
  }, [categoryData, currentPage, itemsPerPage]);

  const pokemonDetails = usePokemonDetails(currentPageData);

  if (isLoadingCategory) return <span className="loading loading-ring loading-sm"></span>;
  if (typesError) return <p>Error: {typesError.message}</p>;

  const totalPages = Math.ceil((categoryData?.pokemon.length || 0) / itemsPerPage);

  return (
    <div className='mx-48'>
      <h1 className='text-center font-bold text-sky-400 text-3xl mb-8 uppercase font-jersey'>{categoryName} pokémons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonDetails.map((query, index) => {
          if (query.isLoading) return <div key={index} className="loading loading-ring loading-md"></div>;
          if (query.error) return <div key={index}>Error: {query.error.message}</div>;
          if (!query.data) return <div key={index}>Pokemon data not available</div>;

          const spriteUrl = query.data.sprites.other.dream_world.front_default || "https://fakeimg.pl/600x400/cccccc/ff0000?text=No+Image+Available";
          return (
            <motion.div
              key={query.data.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card bg-base-200 shadow-xl pb-2 min-h-96"
            >
              <figure className="px-10 pt-10 flex justify-center items-center min-h-[60%]">
                <div className='relative h-32 w-32'>
                  <Image fill src={spriteUrl} alt={`${query.data.name} sprite`} className="rounded-xl" />
                </div>
              </figure>
              <div className="card-body items-center text-center space-y-3">
                <h2 className="card-title text-white">{query.data.name}</h2>
                <div className="card-actions">
                  <Link className="btn text-cyan-400 bg-slate-900" href={`/pokemon/details/${query.data.id}`} prefetch={false}>
                    View More
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="pagination flex justify-center my-8">
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} className={`btn m-1 ${currentPage === i ? "btn-active" : ""}`} onClick={() => setCurrentPage(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
