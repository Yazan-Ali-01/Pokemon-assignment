'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Hero = () => {
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isCategoryPage = pathname.includes('/category');
  const isDetailsPage = pathname.includes('/details');

  const titleText = isCategoryPage ? "Explore Pokemon Categories!" :
    isDetailsPage ? "Learn More About Your Favorite Pokemon!" :
      "All Your Favorite Pokemon Categories!";

  const descriptionText = isCategoryPage ? "Dive into various Pokemon categories to find your favorite type of Pokemon." :
    isDetailsPage ? "Discover detailed information about Pokemon, including their strengths and unique abilities." :
      "Discover a vibrant universe of Pokemon sorted by categories. Explore different types, strengths, and the unique abilities of each Pokemon. Whether you're looking to battle or trade, start your adventure today and catch them all!";

  const containerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 18
      }
    }
  };

  return (
    <motion.div
      className='relative flex items-start justify-start space'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {!isHomePage && (
        <div className='absolute left-8 top-8 text-primary'>
          <Link href='/' className=' hover:text-cyan-400 hover:scale-110'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-12 border-b-2 border-primary pb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </Link>
          <button onClick={() => window.history.back()} className="hover:text-cyan-400 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-12 border-primary pt-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>
      )}
      <div className="hero pt-12 pl-20 text-primary">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold font-nunito">{titleText}</h1>
            <p className="py-6 text-accent text-lg font-nunito">{descriptionText}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;
