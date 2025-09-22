// Standalone Esports Components - Export Index
// Importeer alle componenten voor gemakkelijk gebruik

// Core Components
export { default as CountdownTimer } from './CountdownTimer';
export { default as HighlightsHub } from './HighlightsHub';
export { default as TriviaQuiz } from './TriviaQuiz';
export { default as MiniGame } from './MiniGame';
export { default as PredictionsModule } from './PredictionsModule';
export { default as Leaderboard } from './Leaderboard';
export { default as DidYouKnow } from './DidYouKnow';

// Layout Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';

// Type Exports
export type { CountdownTimerProps } from './CountdownTimer';
export type { TriviaQuizProps, TriviaQuestion } from './TriviaQuiz';
export type { HighlightsHubProps, Highlight } from './HighlightsHub';
export type { MiniGameProps } from './MiniGame';
export type { PredictionsModuleProps, Poll, PollOption } from './PredictionsModule';
export type { LeaderboardProps, LeaderboardEntry } from './Leaderboard';
export type { DidYouKnowProps } from './DidYouKnow';
export type { HeaderProps } from './Header';
export type { FooterProps } from './Footer';
