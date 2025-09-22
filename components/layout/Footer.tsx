'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Heart } from 'lucide-react';
import { BrandConfig } from '@/lib/config';

interface FooterProps {
  config: BrandConfig;
  showEmailCapture?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export default function Footer({ 
  config, 
  showEmailCapture = true, 
  ctaText = "Start Predicting",
  ctaLink = "/predictions"
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{config.logo}</div>
              <div>
                <h3 className="text-xl font-bold">{config.name}</h3>
                <p className="text-gray-400">{config.game}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate esports engagement platform. Predict, play, and compete with fellow fans.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart className="w-4 h-4" />
              <span>Made with passion for esports</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/predictions" className="text-gray-400 hover:text-white transition-colors">
                  Predictions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
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
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
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
            <a
              href={ctaLink}
              className="btn-primary flex items-center gap-2"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>&copy; 2024 {config.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
