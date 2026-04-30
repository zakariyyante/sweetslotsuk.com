import { LogoKey } from '../components/CasinoLogos';

export interface Casino {
  id: number;
  name: string;
  logo: LogoKey | string;
  rating: number;
  votes: number;
  bonus: string;
  url: string;
  badge?: string;
  isMobile?: boolean;
}

interface CasinoRawData {
  name: string;
  logo: LogoKey | string;
  bonus: string;
  url: string;
  votes: number;
  isMobile?: boolean;
}

// Helper function to generate ID from name
const generateIdFromName = (name: string): number => {
  return name.toLowerCase().replace(/\s+/g, '').split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
};
// Badge options for top 3
const topBadges = ["Best Bonus", "Top Pick", "Trending Now"];

// Raw casino data without id, rating, and badgessss
const casinosRawData: CasinoRawData[] = [
  
  {
    name: "BlueFox Casino",
    logo: "/BlueFox_Casino.max-600x340.webp",
    bonus: "WELCOME PACKAGE UP TO £1000 + 100 FREE SPINS",
    url: "https://track-otn.com/trk.php?t=1643&c=2712&s1=BlueFox-{AccountCode}&clickid=",
    votes: 4821,
  },
  {
    name: "MogoBet",
    logo: "/mogobet.webp",
    bonus: "100% UP TO £200 + 20 FREE SPINS",
    url: "https://track-otn.com/trk.php?t=1641&c=2713&s1=MogoBet-{AccountCode}&clickid=",
    votes: 3654,
  },
  {
    name: "Spinland",
    logo: "/spinland.png",
    bonus: "100% WELCOME BONUS UP TO £300 + 50 BONUS SPINS ON FIRST DEPOSIT",
    url: "https://media1.casimbaaff.com/redirect.aspx?pid=48778&lpid=213&bid=1617&subid=Spinland-ST&clickid=",
    votes: 1126,
  },
  
];

// Generate casinos with auto-calculated id, rating, and badge
export const casinos: Casino[] = casinosRawData.map((casino, index) => {
  const rating = parseFloat((10 - Math.floor(index / 1) * 0.1).toFixed(1));
  
  return {
    id: generateIdFromName(casino.name) + index, // Include index to ensure uniqueness
    name: casino.name,
    logo: casino.logo,
    rating: rating,
    votes: casino.votes,
    bonus: casino.bonus,
    url: casino.url,
    badge: index < 3 ? topBadges[index] : undefined,
    isMobile: casino.isMobile
  };
});
