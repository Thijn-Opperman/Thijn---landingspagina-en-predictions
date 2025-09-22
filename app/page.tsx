'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CountdownTimer from '@/components/modules/CountdownTimer';
import DidYouKnow from '@/components/modules/DidYouKnow';
import HighlightsHub from '@/components/modules/HighlightsHub';
import TriviaQuiz from '@/components/modules/TriviaQuiz';
import MiniGame from '@/components/modules/MiniGame';
import { getConfig } from '@/lib/config';

export default function LandingPage() {
  const [showMiniGame, setShowMiniGame] = useState(false);
  const config = getConfig('default'); // You can change this to 'valorant' or 'csgo' for different brands

  return (
    <div className="min-h-screen bg-gray-50">
      <Header config={config} currentPage="landing" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to{' '}
                <span className="text-gradient">{config.name}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The ultimate {config.game} engagement platform. Predict match outcomes, 
                test your knowledge, and compete with fellow fans in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/predictions"
                  className="btn-primary text-lg px-8 py-4 text-center"
                >
                  Start Predicting
                </a>
                <button
                  onClick={() => setShowMiniGame(true)}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Play Mini-Game
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              <CountdownTimer
                targetDate={config.nextMatch.date}
                targetTime={config.nextMatch.time}
                team1={config.nextMatch.team1}
                team2={config.nextMatch.team2}
                game={config.game}
              />
              <DidYouKnow />
            </div>
          </div>
        </section>

        {/* Highlights Hub */}
        <section className="mb-12">
          <HighlightsHub />
        </section>

        {/* Trivia Section */}
        <section className="mb-12">
          <TriviaQuiz 
            questions={[
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
              }
            ]}
            showScore={true}
            title="Quick Quiz"
          />
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Choose {config.name}?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most engaging esports platform with interactive features 
              designed for true fans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Smart Predictions</h3>
              <p className="text-gray-600">
                Make predictions on upcoming matches and earn points for accuracy. 
                Compete with other fans on the leaderboard.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3">Trivia & Quizzes</h3>
              <p className="text-gray-600">
                Test your knowledge with our interactive trivia games. 
                Learn new facts while earning points and badges.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-3">Mini-Games</h3>
              <p className="text-gray-600">
                Play fun mini-games between matches. Challenge your memory 
                and reaction skills while earning bonus points.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer 
        config={config} 
        showEmailCapture={true}
        ctaText="Start Predicting"
        ctaLink="/predictions"
      />

      {/* Mini-Game Modal */}
      {showMiniGame && (
        <MiniGame onClose={() => setShowMiniGame(false)} />
      )}
    </div>
  );
}
