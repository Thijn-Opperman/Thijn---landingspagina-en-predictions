'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandConfig } from '@/lib/config';

interface HeaderProps {
  config: BrandConfig;
  currentPage: 'landing' | 'predictions';
}

export default function Header({ config, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-3xl">{config.logo}</div>
            <div>
              <h1 className="text-xl font-bold text-gradient">{config.name}</h1>
              <p className="text-sm text-gray-600">{config.game}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'landing'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/predictions"
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'predictions'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              Predictions
            </Link>
            <button className="btn-primary">
              Join Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'landing'
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                Home
              </Link>
              <Link
                href="/predictions"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'predictions'
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                Predictions
              </Link>
              <button className="btn-primary w-full mt-2">
                Join Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
