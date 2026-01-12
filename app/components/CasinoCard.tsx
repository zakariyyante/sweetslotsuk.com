import { Casino } from '../data/casinos';
import { Star } from 'lucide-react';
import { logos } from './CasinoLogos';
import Image from 'next/image';
import { track } from '@vercel/analytics';

interface CasinoCardProps {
  casino: Casino;
}

export default function CasinoCard({ casino }: CasinoCardProps) {
  // Track click on mobile casino brands
  const handleCasinoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (casino.isMobile) {
      track('Casino Click', {
        casino: casino.name
      });
    }
  };
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    );
  };

  // Render logo: either from logos object (SVG) or as Image (PNG)
  const renderLogo = () => {
    if (typeof casino.logo === 'string' && casino.logo.startsWith('/')) {
      // It's an image path
      return (
        <Image 
          src={casino.logo} 
          alt={`${casino.name} Casino`} 
          width={200} 
          height={80} 
          className="w-full h-full object-contain"
        />
      );
    }
    // It's a LogoKey, render from logos object
    return logos[casino.logo as keyof typeof logos];
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-3 sm:p-4 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40">
      {/* Top Row: Logo Left, Rating Right */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        {/* Logo - Left */}
        <div className="flex-shrink-0 w-32 sm:w-36 lg:w-48">
          <div className="w-full aspect-[5/2]">
            {renderLogo()}
          </div>
        </div>

        {/* Rating - Right */}
        <div className="flex flex-col items-center sm:items-end gap-0.5 sm:gap-1">
          {renderStars(casino.rating)}
          <span className="text-emerald-400 text-xl sm:text-2xl lg:text-3xl font-bold">
            {casino.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Bottom Row: Bonus Text Left, CTA Button Right */}
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Bonus Text - Left */}
        <div className="flex-1 min-w-0">
          <p className="text-yellow-400 font-semibold text-xs sm:text-sm lg:text-lg leading-snug">
            {casino.bonus}
          </p>
        </div>

        {/* CTA Button - Right */}
        <a
          href={casino.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCasinoClick}
          className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-2 px-5 sm:py-2.5 sm:px-6 lg:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap"
        >
          GET BONUS
        </a>
      </div>
    </div>
  );
}
