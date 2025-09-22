import React, { useState } from 'react';

// Standalone HighlightsHub Component
// Geen externe dependencies behalve React

interface Highlight {
  id: string;
  type: 'video' | 'gif' | 'meme';
  title: string;
  content: string;
  likes: number;
  shares: number;
  timestamp: string;
  thumbnail?: string;
}

interface HighlightsHubProps {
  highlights: Highlight[];
  className?: string;
  onLike?: (highlightId: string, isLiked: boolean) => void;
  onShare?: (highlightId: string) => void;
  onView?: (highlightId: string) => void;
}

export default function HighlightsHub({ 
  highlights, 
  className = "",
  onLike,
  onShare,
  onView
}: HighlightsHubProps) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    const isCurrentlyLiked = likedItems.has(id);
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyLiked) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    
    if (onLike) {
      onLike(id, !isCurrentlyLiked);
    }
  };

  const handleShare = (id: string) => {
    if (onShare) {
      onShare(id);
    }
  };

  const handleView = (id: string) => {
    if (onView) {
      onView(id);
    }
  };

  const getTypeIcon = (type: Highlight['type']) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case 'gif':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'meme':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Highlights Hub
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={highlight.thumbnail || `https://via.placeholder.com/300x200/blue/white?text=${highlight.title}`} 
                alt={highlight.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/300x200/blue/white?text=${highlight.title}`;
                }}
              />
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {getTypeIcon(highlight.type)}
                <span className="capitalize">{highlight.type}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-semibold mb-2">{highlight.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{highlight.timestamp}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(highlight.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                      likedItems.has(highlight.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <svg className={`w-4 h-4 ${likedItems.has(highlight.id) ? 'fill-current' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{highlight.likes + (likedItems.has(highlight.id) ? 1 : 0)}</span>
                  </button>
                  
                  <button 
                    onClick={() => handleShare(highlight.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <span>{highlight.shares}</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => handleView(highlight.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-sm"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export voor gebruik in andere projecten
export { HighlightsHub };
export type { HighlightsHubProps, Highlight };
