# 🧩 Standalone Esports Components

Deze map bevat alle esports engagement componenten als standalone modules die je gemakkelijk kunt kopiëren naar andere projecten.

## 📁 Component Overzicht

### 🎯 Core Components
- **CountdownTimer** - Countdown naar volgende match
- **HighlightsHub** - Interactieve content feed
- **TriviaQuiz** - Quiz module met score tracking
- **MiniGame** - Memory challenge game
- **PredictionsModule** - Poll systeem met voting
- **Leaderboard** - Top gebruikers ranking
- **DidYouKnow** - Feitjes carousel

### 🎨 Layout Components
- **Header** - Navigatie header met branding
- **Footer** - Footer met email capture

## 🚀 Gebruik

### 1. Kopieer Component
```bash
# Kopieer de gewenste component naar je project
cp standalone-components/CountdownTimer.tsx src/components/
```

### 2. Installeer Dependencies
```bash
# Alleen de benodigde packages
npm install lucide-react
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

## 🎨 Styling

Alle componenten gebruiken TailwindCSS classes. Zorg ervoor dat je TailwindCSS hebt geïnstalleerd:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

## 📱 Responsive

Alle componenten zijn mobile-first en responsive. Ze werken op alle screen sizes.

## 🔧 Customization

Elke component heeft duidelijke props interfaces voor eenvoudige aanpassing. Bekijk de individuele component bestanden voor details.
