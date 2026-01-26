'use client';

import { Casino } from '../data/casinos';
import { Star, ArrowRight, Check } from 'lucide-react';
import { logos } from './CasinoLogos';
import Image from 'next/image';
import { track } from '@vercel/analytics';

interface CasinoCardProps {
  casino: Casino;
  badge?: 'gold' | 'silver' | 'bronze';
  gclid?: boolean;
}

export default function CasinoCard({ casino, badge, gclid }: CasinoCardProps) {
  // Track click on mobile casino brands
  const handleCasinoClick = () => {
    if (casino.isMobile) {
      track('Casino Click', {
        casino: casino.name
      });
    }
  };
  const handleCardClick = () => {
    handleCasinoClick();
    window.open(casino.url, '_blank', 'noopener,noreferrer');
  };
  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 fill-amber-400 text-amber-400"
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
          width={180} 
          height={80} 
          className="w-full h-full object-contain logo-pulse"
        />
      );
    }
    // It's a LogoKey, render from logos object
    return logos[casino.logo as keyof typeof logos];
  };

  // Default payment methods - can be made configurable later
  const paymentMethods = ['Apple Pay','Google Pay','PayPal', 'Visa Debit', 'Mastercard Debit', 'Skrill'];

  return (
    <div
      className="relative bg-zinc-900 rounded-2xl p-4 sm:p-5 shadow-lg border border-white/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      {/* Badge - Above Logo */}
      {badge && (
        <div className="mb-2">
          <span
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide ring-1 ${
              badge === 'gold' 
                ? 'bg-emerald-500/20 text-emerald-400 ring-emerald-500/30' 
                : badge === 'silver' 
                ? 'bg-sky-500/20 text-sky-400 ring-sky-500/30' 
                : 'bg-orange-500/20 text-orange-400 ring-orange-500/30'
            }`}
          >
            {badge === 'gold' ? "Most Popular" : badge === 'silver' ? 'Fast Withdrawal' : 'No Wagering'}
          </span>
        </div>
      )}

      {/* Top Section: Logo and Rating */}
      <div className="flex items-start justify-between mb-3">
        {/* Logo - Left */}
        <div className="w-32 h-14 sm:w-36 sm:h-16 flex items-center justify-center [&>svg]:text-white [&>svg]:fill-white">
          {renderLogo()}
        </div>

      {/* Rating - Right */}
        <div className="flex flex-col items-end">
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-3 py-1.5 shadow-sm">
            <span className="text-emerald-400 text-2xl font-extrabold block text-center">
              {casino.rating.toFixed(1)}
            </span>
            <div className="flex justify-center">
              {renderStars(casino.rating)}
            </div>
          </div>
        </div>

      </div>

      {/* Bonus Offer - Centered */}
      <div className="text-center mb-3">
        <p className="text-white font-semibold text-sm sm:text-base uppercase leading-tight">
          {casino.bonus}
        </p>
      </div>

      {/* Payment Methods - Wrap on smaller screens */}
      {/*<div className="mt-3 flex justify-center mb-6">*/}
      {/*  <div className="flex flex-wrap justify-center gap-2 px-1 py-1">*/}
      {/*    {paymentMethods.map((method) => (*/}
      {/*      <span*/}
      {/*        key={method}*/}
      {/*        className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-gray-400"*/}
      {/*      >*/}
      {/*        {method}*/}
      {/*      </span>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* Payment Methods - Scrollable Row */}
      <div className="mt-2 flex justify-center mb-3">
        <div className="flex max-w-full gap-1.5 overflow-x-auto no-scrollbar px-1 py-1">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-white/80"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button - Full Width Bottom */}
      <a
        href={casino.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.stopPropagation();
          handleCasinoClick();
        }}
        className="block w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-xl text-center text-sm sm:text-base uppercase shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        {/*{gclid ? "Claim Bonus": "Play Now"}*/}
        Check Now
        <ArrowRight className="w-4 h-4" />
      </a>
      {gclid &&  <div className="mt-3 flex items-center justify-center gap-4 text-gray-400 text-xs font-semibold">
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          Instant Deposits
        </span>
          <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          Secure & Licensed
        </span>
      </div>}
    </div>
  );
}
