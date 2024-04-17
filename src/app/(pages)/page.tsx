'use client'
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchTypes } from '@/src/app/services/clientApi';
import { useSearchPokemon } from '@/src/app/hooks/useSearchPokemon';
import { CategoryList } from '@/src/app/components/category/CategoryList';

interface ColorStyle {
  bg: string;
  text: string;
}

const zipraColors: ColorStyle[] = [
  { bg: 'bg-accent', text: 'text-accent-content' },
  { bg: 'bg-secondary', text: 'text-secondary-content' }
];

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['types'],
    queryFn: fetchTypes
  });

  const {
    search,
    setSearch,
    searchMessage,
    handleSearch,
    searchLoading
  } = useSearchPokemon();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  if (isLoading) return <span className="loading loading-ring loading-sm"></span>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <main className="px-32 py-5">
      <form onSubmit={handleSearchSubmit} className="relative flex max-w-xs">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for your favorite pokemon!"
          className="input input-bordered input-accent w-full max-w-xs pl-4 pr-8 text-sm"
          disabled={searchLoading}
        />
        <button type="submit" className="absolute w-4 h-4 opacity-70 right-6 top-1/2 transform -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
      {searchMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-xs mt-4" role="alert">
          <strong className="font-bold block">Search Failed!</strong>
          <span className="block sm:inline">{searchMessage}</span>
        </div>
      )}
      {searchLoading && <span className="loading loading-spinner text-info mt-2 ml-2"></span>}
      <h3 className="font-bold text-3xl text-cyan-400 mb-3 border-b-2 border-slate-200 pb-2 mt-4">Categories</h3>
      {data && <CategoryList types={data.results} zipraColors={zipraColors} />}
    </main>
  );
}
