# 🧩 Standalone Components - Gebruikersgids

## 📋 Overzicht

Deze map bevat alle esports engagement componenten als standalone modules. Elke component is volledig onafhankelijk en kan gemakkelijk worden gekopieerd naar andere projecten.

## 🚀 Quick Start

### 1. Kopieer Component
```bash
# Kopieer de gewenste component naar je project
cp standalone-components/CountdownTimer.tsx src/components/
```

### 2. Installeer Dependencies
```bash
# Alleen React is vereist (geen externe dependencies)
npm install react
```

### 3. Import en Gebruik
```tsx
import CountdownTimer from './components/CountdownTimer';

<CountdownTimer
  targetDate="2024-01-15"
  targetTime="20:00"
  team1="Team Liquid"
  team2="Cloud9"
  game="League of Legends"
/>
```

## 📦 Beschikbare Componenten

### 🎯 Core Components

#### CountdownTimer
**Bestand:** `CountdownTimer.tsx`
**Beschrijving:** Countdown timer naar volgende match

```tsx
<CountdownTimer
  targetDate="2024-01-15"
  targetTime="20:00"
  team1="Team Liquid"
  team2="Cloud9"
  game="League of Legends"
  className="mb-6"
  showGame={true}
  showTrophy={true}
/>
```

**Props:**
- `targetDate`: string - Datum van de match (YYYY-MM-DD)
- `targetTime`: string - Tijd van de match (HH:MM)
- `team1`: string - Naam van team 1
- `team2`: string - Naam van team 2
- `game`: string - Naam van het spel
- `className?`: string - Extra CSS classes
- `showGame?`: boolean - Toon game naam (default: true)
- `showTrophy?`: boolean - Toon trophy icoon (default: true)

#### TriviaQuiz
**Bestand:** `TriviaQuiz.tsx`
**Beschrijving:** Interactieve quiz module

```tsx
<TriviaQuiz
  questions={triviaQuestions}
  showScore={true}
  title="Quick Quiz"
  onComplete={(score) => console.log('Quiz completed:', score)}
  onQuestionAnswer={(questionId, isCorrect) => console.log('Answer:', questionId, isCorrect)}
/>
```

**Props:**
- `questions`: TriviaQuestion[] - Array van quiz vragen
- `showScore?`: boolean - Toon score (default: true)
- `title?`: string - Titel van de quiz (default: "Quick Quiz")
- `className?`: string - Extra CSS classes
- `onComplete?`: (score: number) => void - Callback bij voltooiing
- `onQuestionAnswer?`: (questionId: string, isCorrect: boolean) => void - Callback bij antwoord

#### HighlightsHub
**Bestand:** `HighlightsHub.tsx`
**Beschrijving:** Interactieve content feed

```tsx
<HighlightsHub
  highlights={highlights}
  onLike={(highlightId, isLiked) => console.log('Like:', highlightId, isLiked)}
  onShare={(highlightId) => console.log('Share:', highlightId)}
  onView={(highlightId) => console.log('View:', highlightId)}
/>
```

**Props:**
- `highlights`: Highlight[] - Array van highlights
- `className?`: string - Extra CSS classes
- `onLike?`: (highlightId: string, isLiked: boolean) => void - Callback bij like
- `onShare?`: (highlightId: string) => void - Callback bij share
- `onView?`: (highlightId: string) => void - Callback bij view

#### MiniGame
**Bestand:** `MiniGame.tsx`
**Beschrijving:** Memory challenge game

```tsx
<MiniGame
  onClose={() => setShowMiniGame(false)}
  onScoreUpdate={(score) => console.log('Score:', score)}
  onGameComplete={(finalScore) => console.log('Final score:', finalScore)}
/>
```

**Props:**
- `onClose`: () => void - Callback bij sluiten
- `className?`: string - Extra CSS classes
- `onScoreUpdate?`: (score: number) => void - Callback bij score update
- `onGameComplete?`: (finalScore: number) => void - Callback bij game over

#### PredictionsModule
**Bestand:** `PredictionsModule.tsx`
**Beschrijving:** Poll systeem met voting

```tsx
<PredictionsModule
  polls={polls}
  onVote={(pollId, optionId) => console.log('Vote:', pollId, optionId)}
  onPointsEarned={(points) => console.log('Points:', points)}
/>
```

**Props:**
- `polls`: Poll[] - Array van polls
- `className?`: string - Extra CSS classes
- `onVote?`: (pollId: string, optionId: string) => void - Callback bij stemmen
- `onPointsEarned?`: (points: number) => void - Callback bij punten verdienen

#### Leaderboard
**Bestand:** `Leaderboard.tsx`
**Beschrijving:** Top gebruikers ranking

```tsx
<Leaderboard
  entries={leaderboardEntries}
  maxEntries={10}
  showBadges={true}
  onUserClick={(userId) => console.log('User clicked:', userId)}
/>
```

**Props:**
- `entries`: LeaderboardEntry[] - Array van leaderboard entries
- `className?`: string - Extra CSS classes
- `maxEntries?`: number - Max aantal entries (default: 10)
- `showBadges?`: boolean - Toon badges (default: true)
- `onUserClick?`: (userId: string) => void - Callback bij user klik

#### DidYouKnow
**Bestand:** `DidYouKnow.tsx`
**Beschrijving:** Feitjes carousel

```tsx
<DidYouKnow
  facts={facts}
  autoRotate={true}
  rotationInterval={5000}
  onFactChange={(index, fact) => console.log('Fact changed:', index, fact)}
/>
```

**Props:**
- `facts`: string[] - Array van feitjes
- `className?`: string - Extra CSS classes
- `autoRotate?`: boolean - Auto rotatie (default: true)
- `rotationInterval?`: number - Rotatie interval in ms (default: 5000)
- `onFactChange?`: (index: number, fact: string) => void - Callback bij fact change

### 🎨 Layout Components

#### Header
**Bestand:** `Header.tsx`
**Beschrijving:** Navigatie header

```tsx
<Header
  brandName="EsportsHub"
  brandLogo="🏆"
  gameName="League of Legends"
  currentPage="landing"
  onNavigate={(page) => console.log('Navigate to:', page)}
  onJoinClick={() => console.log('Join clicked')}
/>
```

**Props:**
- `brandName`: string - Naam van het merk
- `brandLogo`: string - Logo emoji/tekst
- `gameName`: string - Naam van het spel
- `currentPage`: 'landing' | 'predictions' - Huidige pagina
- `className?`: string - Extra CSS classes
- `onNavigate?`: (page: string) => void - Callback bij navigatie
- `onJoinClick?`: () => void - Callback bij join klik
- `showJoinButton?`: boolean - Toon join button (default: true)
- `joinButtonText?`: string - Join button tekst (default: "Join Now")

#### Footer
**Bestand:** `Footer.tsx`
**Beschrijving:** Footer met email capture

```tsx
<Footer
  brandName="EsportsHub"
  brandLogo="🏆"
  gameName="League of Legends"
  showEmailCapture={true}
  ctaText="Start Predicting"
  onEmailSubscribe={(email) => console.log('Email:', email)}
  onCtaClick={() => console.log('CTA clicked')}
/>
```

**Props:**
- `brandName`: string - Naam van het merk
- `brandLogo`: string - Logo emoji/tekst
- `gameName`: string - Naam van het spel
- `className?`: string - Extra CSS classes
- `showEmailCapture?`: boolean - Toon email capture (default: true)
- `ctaText?`: string - CTA tekst (default: "Start Predicting")
- `ctaLink?`: string - CTA link (default: "/predictions")
- `onCtaClick?`: () => void - Callback bij CTA klik
- `onEmailSubscribe?`: (email: string) => void - Callback bij email subscribe
- `onLinkClick?`: (link: string) => void - Callback bij link klik

## 🎨 Styling

### TailwindCSS
Alle componenten gebruiken TailwindCSS classes. Zorg ervoor dat je TailwindCSS hebt geïnstalleerd:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### Custom CSS Classes
De componenten gebruiken standaard TailwindCSS classes. Je kunt deze aanpassen door de className prop te gebruiken:

```tsx
<CountdownTimer
  className="mb-8 shadow-xl"
  // ... andere props
/>
```

### Responsive Design
Alle componenten zijn mobile-first en responsive:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 📱 Mobile Optimization

Alle componenten zijn geoptimaliseerd voor mobiele apparaten:
- Touch-friendly interacties
- Responsive grid layouts
- Mobile navigation
- Optimized component sizing

## 🔧 Customization

### Props Interface
Elke component heeft een duidelijke TypeScript interface voor type safety:

```tsx
interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
  team1: string;
  team2: string;
  game: string;
  className?: string;
  showGame?: boolean;
  showTrophy?: boolean;
}
```

### Callback Functions
Veel componenten ondersteunen callback functions voor externe integratie:

```tsx
<TriviaQuiz
  onComplete={(score) => {
    // Update user score in database
    updateUserScore(score);
  }}
  onQuestionAnswer={(questionId, isCorrect) => {
    // Track analytics
    trackAnswer(questionId, isCorrect);
  }}
/>
```

## 📊 Example Data

Gebruik de example data uit `example-data.ts` om componenten te testen:

```tsx
import { 
  exampleHighlights, 
  exampleTriviaQuestions, 
  examplePolls,
  exampleLeaderboard,
  exampleFacts 
} from './example-data';

<HighlightsHub highlights={exampleHighlights} />
<TriviaQuiz questions={exampleTriviaQuestions} />
<PredictionsModule polls={examplePolls} />
<Leaderboard entries={exampleLeaderboard} />
<DidYouKnow facts={exampleFacts} />
```

## 🚀 Integration Examples

### React App
```tsx
import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import TriviaQuiz from './components/TriviaQuiz';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div>
      <CountdownTimer
        targetDate="2024-01-15"
        targetTime="20:00"
        team1="Team Liquid"
        team2="Cloud9"
        game="League of Legends"
      />
      
      {showQuiz && (
        <TriviaQuiz
          questions={triviaQuestions}
          onComplete={(score) => {
            console.log('Quiz completed:', score);
            setShowQuiz(false);
          }}
        />
      )}
    </div>
  );
}
```

### Next.js App
```tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountdownTimer from '../components/CountdownTimer';

export default function HomePage() {
  return (
    <div>
      <Header
        brandName="EsportsHub"
        brandLogo="🏆"
        gameName="League of Legends"
        currentPage="landing"
      />
      
      <main>
        <CountdownTimer
          targetDate="2024-01-15"
          targetTime="20:00"
          team1="Team Liquid"
          team2="Cloud9"
          game="League of Legends"
        />
      </main>
      
      <Footer
        brandName="EsportsHub"
        brandLogo="🏆"
        gameName="League of Legends"
      />
    </div>
  );
}
```

## 🎯 Best Practices

1. **Type Safety**: Gebruik TypeScript voor betere type safety
2. **Props Validation**: Valideer props voordat je ze gebruikt
3. **Error Handling**: Implementeer error handling voor externe data
4. **Performance**: Gebruik React.memo voor zware componenten
5. **Accessibility**: Zorg voor goede accessibility support

## 🐛 Troubleshooting

### Common Issues

1. **Styling not working**: Controleer of TailwindCSS correct is geïnstalleerd
2. **TypeScript errors**: Controleer of alle props correct zijn gedefinieerd
3. **Mobile issues**: Test op verschillende screen sizes
4. **Callback errors**: Controleer of callback functions correct zijn geïmplementeerd

### Support

Voor vragen of problemen:
1. Controleer de TypeScript interfaces
2. Bekijk de example data
3. Test met minimale props eerst
4. Controleer de console voor errors

---

**🎮 Veel succes met je esports platform!**
