'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { didYouKnowFacts } from '@/lib/dummyData';

export default function DidYouKnow() {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % didYouKnowFacts.length);
    }, 5000); // Change fact every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextFact = () => {
    setCurrentFact(prev => (prev + 1) % didYouKnowFacts.length);
  };

  const prevFact = () => {
    setCurrentFact(prev => (prev - 1 + didYouKnowFacts.length) % didYouKnowFacts.length);
  };

  return (
    <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="text-xl font-bold text-yellow-800">Did You Know?</h3>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentFact * 100}%)` }}
          >
            {didYouKnowFacts.map((fact, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <p className="text-gray-700 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {didYouKnowFacts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFact(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentFact ? 'bg-yellow-600' : 'bg-yellow-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevFact}
              className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextFact}
              className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
