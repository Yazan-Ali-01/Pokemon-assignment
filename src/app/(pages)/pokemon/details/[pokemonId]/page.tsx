'use client'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchPokemonDetails } from '@/src/app/services/clientApi';
import { PokemonDetails } from '@/src/app/types/pokemon';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const PokemonDetailsPage = ({ params }: { params: { pokemonId: string } }) => {
  const { pokemonId } = params;

  const { data: pokemon, isLoading, error } = useQuery<PokemonDetails, Error>({
    queryKey: ['pokemonDetails', pokemonId],
    queryFn: () => fetchPokemonDetails(pokemonId as string),
    enabled: !!pokemonId
  });

  if (isLoading) return <span className="loading loading-ring loading-sm"></span>
  if (error) return <p>Error: {error.message}</p>;
  if (!pokemon) return <p>No Pokemon found.</p>;
  const chartOptions = {
    chart: {
      type: "bar" as "bar",
      toolbar: {
        show: false // Hides the toolbar
      }
    },
    xaxis: {
      categories: pokemon.stats.map(stat => stat.stat.name),
      labels: {
        style: {
          colors: ['#06b6d4'], // Tomato color for x-axis labels
          fontSize: '12px',
          fontWeight: 'bold',
        }
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#06b6d4',
        width: 6
      },
      axisBorder: {
        show: false,
        color: '#06b6d4',
        height: 1
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#06b6d4'], // Tomato color for y-axis labels
          fontSize: '12px',
          fontWeight: 'bold',
        }
      },

    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true, // Each bar gets its own color from the 'colors' array
        barHeight: '75%', // Adjusts bar thickness
        colors: {
          backgroundBarColors: ['#e7f0fd', '#cdddec', '#b0c7da', '#93b1c9', '#769bb8', '#5986a7'], // Array of colors for the bars
          backgroundBarRadius: 5 // Optional: Adds a radius to the corners of the bars
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Pokemon Stats',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#06b6d4' // Custom color for the title
      }
    },
    colors: ['#0891b2'],
    grid: {
      borderColor: '#0c4a6e' // Light grey grid lines
    }
  };

  const chartSeries = [{
    name: 'Base Stat',
    data: pokemon.stats.map(stat => stat.base_stat)
  }];

  return (
    <div className='container mx-auto p-4'>
      {/* Top Row for Name and Image */}
      <div className='flex items-center space-x-16 mb-4'>
        <h1 className='text-2xl font-bold gradient-text'>{pokemon.name}</h1>
        <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={75} height={75} className="rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />
      </div>

      {/* Bottom Row for Info and Chart */}
      <div className='grid grid-cols-2 gap-4'>
        {/* Left Column for Textual Info */}
        <div className='col-span-1 flex py-5 items-center '>
          <div className="text-sm w-full space-y-8 ">
            <p className='border-b-2 border-cyan-950'><strong className='uppercase text-slate-100 font-normal'>Base Experience:</strong> <span className='text-lg text-cyan-400'>{pokemon.base_experience}</span></p>
            <p className='border-b-2 border-cyan-950'><strong className='uppercase text-slate-100 font-normal'>Height:</strong> <span className='text-lg text-cyan-400'>{pokemon.height / 10} m</span> </p>
            <p className='border-b-2 border-cyan-950'><strong className='uppercase text-slate-100 font-normal'>Weight:</strong> <span className='text-lg text-cyan-400'>{pokemon.weight / 10} kg</span> </p>
            <p className='border-b-2 border-cyan-950'><strong className='uppercase text-slate-100 font-normal'>Abilities:</strong> <span className='text-lg text-cyan-400'>{pokemon.abilities.map(ability => ability.ability.name).join(', ')}</span></p>
            <p className='border-b-2 border-cyan-950'><strong className='uppercase text-slate-100 font-normal'>Number of Moves:</strong> <span className='text-lg text-cyan-400'>{pokemon.moves.length}</span></p>
            <p className='border-b-2 border-cyan-950'><strong className='uppercase text-slate-100 font-normal'>Types:</strong> <span className='text-lg text-cyan-400'>{pokemon.types.map(type => type.type.name).join(', ')}</span></p>
          </div>
        </div>

        {/* Right Column for Chart */}
        <div className='col-span-1'>
          <Chart options={chartOptions as ApexOptions} series={chartSeries} type="bar" height={400} />
        </div>
      </div>
    </div>

  );
};

export default PokemonDetailsPage;
