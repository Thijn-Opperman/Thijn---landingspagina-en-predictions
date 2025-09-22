// White-label configuration for different brands/games
export interface BrandConfig {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  game: string;
  nextMatch: {
    team1: string;
    team2: string;
    date: string;
    time: string;
  };
}

export const defaultConfig: BrandConfig = {
  name: "EsportsHub",
  logo: "🏆",
  primaryColor: "#0ea5e9",
  secondaryColor: "#d946ef", 
  accentColor: "#ef4444",
  fontFamily: "Inter",
  game: "League of Legends",
  nextMatch: {
    team1: "Team Liquid",
    team2: "Cloud9",
    date: "2024-01-15",
    time: "20:00"
  }
};

// Example configurations for different brands
export const brandConfigs: Record<string, BrandConfig> = {
  default: defaultConfig,
  valorant: {
    name: "ValorantPro",
    logo: "🎯",
    primaryColor: "#ff4655",
    secondaryColor: "#0f1419",
    accentColor: "#ff6b35",
    fontFamily: "Poppins",
    game: "Valorant",
    nextMatch: {
      team1: "Sentinels",
      team2: "Optic Gaming",
      date: "2024-01-16",
      time: "19:30"
    }
  },
  csgo: {
    name: "CS:GO Arena",
    logo: "💣",
    primaryColor: "#b8860b",
    secondaryColor: "#2d2d2d",
    accentColor: "#ffd700",
    fontFamily: "Inter",
    game: "Counter-Strike 2",
    nextMatch: {
      team1: "NAVI",
      team2: "G2 Esports",
      date: "2024-01-17",
      time: "21:00"
    }
  }
};

export const getConfig = (brand: string = 'default'): BrandConfig => {
  return brandConfigs[brand] || defaultConfig;
};
