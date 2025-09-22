import React, { useState, useEffect } from 'react';

// Standalone DidYouKnow Component
// Geen externe dependencies behalve React

interface DidYouKnowProps {
  facts: string[];
  className?: string;
  autoRotate?: boolean;
  rotationInterval?: number;
  onFactChange?: (factIndex: number, fact: string) => void;
}

export default function DidYouKnow({ 
  facts, 
  className = "",
  autoRotate = true,
  rotationInterval = 5000,
  onFactChange
}: DidYouKnowProps) {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    if (!autoRotate || facts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentFact(prev => {
        const nextIndex = (prev + 1) % facts.length;
        if (onFactChange) {
          onFactChange(nextIndex, facts[nextIndex]);
        }
        return nextIndex;
      });
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [facts, autoRotate, rotationInterval, onFactChange]);

  const nextFact = () => {
    const nextIndex = (currentFact + 1) % facts.length;
    setCurrentFact(nextIndex);
    if (onFactChange) {
      onFactChange(nextIndex, facts[nextIndex]);
    }
  };

  const prevFact = () => {
    const prevIndex = (currentFact - 1 + facts.length) % facts.length;
    setCurrentFact(prevIndex);
    if (onFactChange) {
      onFactChange(prevIndex, facts[prevIndex]);
    }
  };

  const goToFact = (index: number) => {
    setCurrentFact(index);
    if (onFactChange) {
      onFactChange(index, facts[index]);
    }
  };

  if (facts.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 rounded-xl shadow-lg border p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-yellow-800">Did You Know?</h3>
        </div>
        <p className="text-gray-600">No facts available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 rounded-xl shadow-lg border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-yellow-800">Did You Know?</h3>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentFact * 100}%)` }}
          >
            {facts.map((fact, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <p className="text-gray-700 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToFact(index)}
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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={nextFact}
              className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export voor gebruik in andere projecten
export { DidYouKnow };
export type { DidYouKnowProps };
