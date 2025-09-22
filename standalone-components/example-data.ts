// Example data for standalone components
// Gebruik deze data om de componenten te testen

export const exampleHighlights = [
  {
    id: '1',
    type: 'video' as const,
    title: 'Incredible 1v4 clutch!',
    content: 'https://example.com/video1.mp4',
    likes: 1247,
    shares: 89,
    timestamp: '2 hours ago',
    thumbnail: 'https://via.placeholder.com/300x200/0ea5e9/ffffff?text=1v4+Clutch'
  },
  {
    id: '2',
    type: 'gif' as const,
    title: 'Perfect headshot timing',
    content: 'https://example.com/gif1.gif',
    likes: 892,
    shares: 156,
    timestamp: '4 hours ago',
    thumbnail: 'https://via.placeholder.com/300x200/d946ef/ffffff?text=Headshot'
  },
  {
    id: '3',
    type: 'meme' as const,
    title: 'When you miss the easy shot',
    content: 'https://example.com/meme1.jpg',
    likes: 2103,
    shares: 234,
    timestamp: '6 hours ago',
    thumbnail: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Meme'
  }
];

export const exampleTriviaQuestions = [
  {
    id: '1',
    question: 'Which team won the 2023 World Championship?',
    options: ['T1', 'Gen.G', 'DRX', 'JDG'],
    correctAnswer: 0,
    points: 10,
    category: 'Championships'
  },
  {
    id: '2',
    question: 'What is the maximum number of players in a Valorant team?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    points: 5,
    category: 'Game Rules'
  },
  {
    id: '3',
    question: 'Which map is known as "Dust2" in Counter-Strike?',
    options: ['de_dust2', 'de_mirage', 'de_inferno', 'de_cache'],
    correctAnswer: 0,
    points: 8,
    category: 'Maps'
  }
];

export const examplePolls = [
  {
    id: '1',
    question: 'Who will win the next match?',
    options: [
      { id: '1', text: 'Team Liquid', votes: 1247, percentage: 45 },
      { id: '2', text: 'Cloud9', votes: 1523, percentage: 55 }
    ],
    totalVotes: 2770,
    expiresAt: '2024-01-15T20:00:00Z'
  },
  {
    id: '2',
    question: 'What is your favorite game mode?',
    options: [
      { id: '1', text: 'Ranked', votes: 892, percentage: 40 },
      { id: '2', text: 'Unrated', votes: 567, percentage: 25 },
      { id: '3', text: 'Spike Rush', votes: 456, percentage: 20 },
      { id: '4', text: 'Deathmatch', votes: 312, percentage: 15 }
    ],
    totalVotes: 2227,
    expiresAt: '2024-01-20T18:00:00Z'
  }
];

export const exampleLeaderboard = [
  {
    id: '1',
    username: 'ProGamer2024',
    points: 2847,
    rank: 1,
    avatar: 'https://via.placeholder.com/40x40/0ea5e9/ffffff?text=P',
    badges: ['🏆', '⭐', '🔥']
  },
  {
    id: '2',
    username: 'EsportsFan99',
    points: 2156,
    rank: 2,
    avatar: 'https://via.placeholder.com/40x40/d946ef/ffffff?text=E',
    badges: ['⭐', '🔥']
  },
  {
    id: '3',
    username: 'PredictionKing',
    points: 1987,
    rank: 3,
    avatar: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=P',
    badges: ['🔥', '💎']
  },
  {
    id: '4',
    username: 'QuizMaster',
    points: 1756,
    rank: 4,
    avatar: 'https://via.placeholder.com/40x40/10b981/ffffff?text=Q',
    badges: ['💎', '🎯']
  },
  {
    id: '5',
    username: 'TriviaExpert',
    points: 1634,
    rank: 5,
    avatar: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=T',
    badges: ['🎯']
  }
];

export const exampleFacts = [
  "The first esports tournament was held in 1972 at Stanford University for Spacewar!",
  "Esports viewership is expected to reach 577 million by 2024",
  "The highest prize pool in esports history was $40 million for The International 2021",
  "Professional esports players can have reaction times as fast as 100-200 milliseconds",
  "South Korea was the first country to recognize esports as an official sport in 2000"
];

export const exampleBrandConfig = {
  name: "EsportsHub",
  logo: "🏆",
  game: "League of Legends",
  nextMatch: {
    team1: "Team Liquid",
    team2: "Cloud9",
    date: "2024-01-15",
    time: "20:00"
  }
};
