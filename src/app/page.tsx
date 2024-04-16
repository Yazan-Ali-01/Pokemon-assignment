'use client'
import { useQuery } from "@tanstack/react-query";
import { fetchTypes } from "@/src/app/services/clientApi";
import React from 'react';
import { useRouter } from "next/navigation";
import { ApiResponse, Type } from "@/src/app/types/api";

interface ColorStyle {
  bg: string;
  text: string;
}

const zipraColors: ColorStyle[] = [
  { bg: 'bg-accent', text: 'text-accent-content' },
  { bg: 'bg-secondary', text: 'text-secondary-content' }
];

export default function Home() {
  const router = useRouter()
  const { data, error, isLoading } = useQuery<ApiResponse, Error>({
    queryKey: ['types'],
    queryFn: fetchTypes,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;


  return (
    <main className="px-32 py-5">
      <h3 className="font-bold text-3xl text-cyan-400 mb-3">Categories</h3>
      <div className="grid grid-cols-3 gap-4">
        {data?.results.map((type: Type, index: number) => {
          const color = zipraColors[index % zipraColors.length];
          return (
            <div
              key={type.name}
              className={`card card-bordered my-2 ${color.bg} cursor-pointer`}
              onClick={() => router.push(`/pokemon/${type.name}`)}
            >
              <div className="card-body">
                <h4 className={`card-title ${color.text}`}>{type.name}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
