'use client';

import { useMemo } from 'react';
import { Casino } from '../data/casinos';
import CasinoCard from './CasinoCard';
import Header from './Header';
import Footer from './Footer';

interface MobileCasinoModalProps {
  mobileCasinos: Casino[];
  isOnline: boolean;
  gclidValue?: string;
}

export default function MobileCasinoModal({ mobileCasinos, isOnline, gclidValue = '' }: MobileCasinoModalProps) {
  const isOpen = isOnline && mobileCasinos.length > 0;

  const updatedCasinos = useMemo(() => {
    if (!gclidValue) return mobileCasinos;
    
    return mobileCasinos.map(casino => ({
      ...casino,
      url: casino.url + `&gclid=${gclidValue}`
    }));
  }, [mobileCasinos, gclidValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#07080f]/95 backdrop-blur-sm overflow-y-auto">
      <div className="w-full min-h-screen bg-[#07080f] felt-texture">
        <Header />

        {/* Hero Section */}
        <div className="bg-[#0a0c18] border-b border-amber-500/10 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur">
          <div className="container mx-auto">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1">
              {isOnline ? 'Best Casino Sites 2026' : 'New Casino Sites 2026'}
            </h1>
            <h2 className="text-left sm:text-xl font-extrabold gold-text mb-1">
              {isOnline ? 'Discover new casino sites offering instant withdrawals and generous sign-up rewards.' : 'Browse the top-rated casinos across the UK'}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 max-w-5xl mx-auto">
            {updatedCasinos.map((casino, index) => (
              <CasinoCard
                isOnline={isOnline}
                key={casino.id} 
                casino={casino}
                rank={index + 1}
                badge={index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : index === 3 ? 'fourth' : undefined}
              />
            ))}
          </div>

          <div className="mt-6 sm:mt-8 bg-amber-500/5 border border-amber-500/15 rounded-2xl p-3 sm:p-4 max-w-6xl mx-auto">
            <p className="text-amber-200/50 text-xs sm:text-sm text-center">
              <strong className="text-amber-200/70">New customers only.</strong> 18+. T&Cs apply. BeGambleAware.org. Please play responsibly.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
