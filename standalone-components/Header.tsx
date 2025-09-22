import React, { useState } from 'react';

// Standalone Header Component
// Geen externe dependencies behalve React

interface HeaderProps {
  brandName: string;
  brandLogo: string;
  gameName: string;
  currentPage: 'landing' | 'predictions';
  className?: string;
  onNavigate?: (page: string) => void;
  onJoinClick?: () => void;
  showJoinButton?: boolean;
  joinButtonText?: string;
}

export default function Header({ 
  brandName,
  brandLogo,
  gameName,
  currentPage,
  className = "",
  onNavigate,
  onJoinClick,
  showJoinButton = true,
  joinButtonText = "Join Now"
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleJoinClick = () => {
    if (onJoinClick) {
      onJoinClick();
    }
  };

  return (
    <header className={`bg-white shadow-lg border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigation('landing')}
          >
            <div className="text-3xl">{brandLogo}</div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {brandName}
              </h1>
              <p className="text-sm text-gray-600">{gameName}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation('landing')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'landing'
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('predictions')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'predictions'
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Predictions
            </button>
            {showJoinButton && (
              <button 
                onClick={handleJoinClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {joinButtonText}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigation('landing')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'landing'
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('predictions')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'predictions'
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Predictions
              </button>
              {showJoinButton && (
                <button 
                  onClick={handleJoinClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl w-full mt-2"
                >
                  {joinButtonText}
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Export voor gebruik in andere projecten
export { Header };
export type { HeaderProps };
