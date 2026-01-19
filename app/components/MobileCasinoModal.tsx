'use client';

import { useState, useEffect, useMemo } from 'react';
import { Casino } from '../data/casinos';
import CasinoCard from './CasinoCard';

interface MobileCasinoModalProps {
  mobileCasinos: Casino[];
}

export default function MobileCasinoModal({ mobileCasinos }: MobileCasinoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [gclidValue, setGclidValue] = useState<string>('');

  useEffect(() => {
    // Check if URL contains gclid parameter (Google Ads click ID)
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');
    
    // Only open modal if gclid exists AND there are mobile casinos to show
    if (gclid && mobileCasinos.length > 0) {
      setGclidValue(gclid);
      setIsOpen(true);
    }
  }, [mobileCasinos]);

  // Update casino URLs with actual gclid value
  const updatedCasinos = useMemo(() => {
    if (!gclidValue) return mobileCasinos;
    
    return mobileCasinos.map(casino => ({
      ...casino,
      url: casino.url.split('?')[0] + `?gclid=${gclidValue}`
    }));
  }, [mobileCasinos, gclidValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Hero Section */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-purple-900/95 to-slate-900/95 backdrop-blur-sm border-b border-purple-500/30 px-4 sm:px-6 py-6 sm:py-8">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-yellow-400 mb-3 sm:mb-4">
              🎰 New Casino Sites with Fast Withdrawal 2026
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300">
              Check the best slots games at new casinos with instant fast withdrawal and top bonuses
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="space-y-3 sm:space-y-4 max-w-6xl mx-auto">
            {updatedCasinos.map((casino, index) => (
              <CasinoCard 
                key={casino.id} 
                casino={casino} 
                badge={index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 sm:mt-8 bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 sm:p-4 max-w-6xl mx-auto">
            <p className="text-gray-300 text-xs sm:text-sm text-center">
              <strong>New customers only.</strong> 18+. T&Cs apply. BeGambleAware.org. Please play responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

