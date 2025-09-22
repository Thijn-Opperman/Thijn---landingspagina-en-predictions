'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CountdownTimer from '@/components/modules/CountdownTimer';
import PredictionsModule from '@/components/modules/PredictionsModule';
import Leaderboard from '@/components/modules/Leaderboard';
import TriviaQuiz from '@/components/modules/TriviaQuiz';
import { getConfig } from '@/lib/config';

export default function PredictionsPage() {
  const config = getConfig('default'); // You can change this to 'valorant' or 'csgo' for different brands

  return (
    <div className="min-h-screen bg-gray-50">
      <Header config={config} currentPage="predictions" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Predictions</span> & Leaderboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make your predictions, test your knowledge, and climb the leaderboard. 
              Show everyone who the real {config.game} expert is!
            </p>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="mb-8">
          <CountdownTimer
            targetDate={config.nextMatch.date}
            targetTime={config.nextMatch.time}
            team1={config.nextMatch.team1}
            team2={config.nextMatch.team2}
            game={config.game}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Predictions */}
          <div>
            <PredictionsModule />
          </div>

          {/* Right Column - Leaderboard */}
          <div>
            <Leaderboard />
          </div>
        </div>

        {/* Bonus Trivia Section */}
        <section className="mt-12">
          <TriviaQuiz 
            questions={[
              {
                id: '1',
                question: 'Which map is known as "Dust2" in Counter-Strike?',
                options: ['de_dust2', 'de_mirage', 'de_inferno', 'de_cache'],
                correctAnswer: 0,
                points: 8,
                category: 'Maps'
              },
              {
                id: '2',
                question: 'What is the maximum number of rounds in a Valorant match?',
                options: ['13', '16', '24', '30'],
                correctAnswer: 2,
                points: 6,
                category: 'Game Rules'
              },
              {
                id: '3',
                question: 'Which agent has the ability to resurrect teammates?',
                options: ['Sage', 'Phoenix', 'Reyna', 'Omen'],
                correctAnswer: 0,
                points: 7,
                category: 'Agents'
              }
            ]}
            showScore={true}
            title="Bonus Trivia"
          />
        </section>

        {/* How It Works Section */}
        <section className="mt-12">
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Make Predictions</h3>
                <p className="text-gray-600">
                  Vote on upcoming matches and earn points for each prediction you make.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Answer Trivia</h3>
                <p className="text-gray-600">
                  Test your knowledge with trivia questions and earn bonus points for correct answers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Climb Leaderboard</h3>
                <p className="text-gray-600">
                  Compete with other fans and see your name at the top of the leaderboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer 
        config={config} 
        showEmailCapture={true}
        ctaText="Make More Predictions"
        ctaLink="/predictions"
      />
    </div>
  );
}
