import React, { useState } from 'react';

// Standalone Footer Component
// Geen externe dependencies behalve React

interface FooterProps {
  brandName: string;
  brandLogo: string;
  gameName: string;
  className?: string;
  showEmailCapture?: boolean;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  onEmailSubscribe?: (email: string) => void;
  onLinkClick?: (link: string) => void;
}

export default function Footer({ 
  brandName,
  brandLogo,
  gameName,
  className = "",
  showEmailCapture = true, 
  ctaText = "Start Predicting",
  ctaLink = "/predictions",
  onCtaClick,
  onEmailSubscribe,
  onLinkClick
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      if (onEmailSubscribe) {
        onEmailSubscribe(email);
      }
      setEmail('');
    }
  };

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  const handleLinkClick = (link: string) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{brandLogo}</div>
              <div>
                <h3 className="text-xl font-bold">{brandName}</h3>
                <p className="text-gray-400">{gameName}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate esports engagement platform. Predict, play, and compete with fellow fans.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Made with passion for esports</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('predictions')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Predictions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('leaderboard')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Leaderboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Email Capture */}
          {showEmailCapture && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              {!isSubscribed ? (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                      Get notified about new matches and features
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="text-center p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                  <div className="text-green-400 text-lg mb-2">✓</div>
                  <p className="text-green-400 font-semibold">Thanks for subscribing!</p>
                  <p className="text-sm text-gray-400">We'll keep you updated on the latest matches.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Ready to start predicting?</h4>
              <p className="text-gray-400">Join thousands of fans making predictions and competing for the top spot.</p>
            </div>
            <button
              onClick={handleCtaClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {ctaText}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>&copy; 2024 {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleLinkClick('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleLinkClick('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleLinkClick('contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Export voor gebruik in andere projecten
export { Footer };
export type { FooterProps };
