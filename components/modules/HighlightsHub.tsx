'use client';

import { useState } from 'react';
import { Heart, Share2, Play, Image as ImageIcon } from 'lucide-react';
import { highlights, type Highlight } from '@/lib/dummyData';

export default function HighlightsHub() {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type: Highlight['type']) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'gif':
        return <ImageIcon className="w-4 h-4" />;
      case 'meme':
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6 text-gradient">Highlights Hub</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={highlight.thumbnail} 
                alt={highlight.title}
                className="w-full h-48 object-cover"
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
                    <Heart className={`w-4 h-4 ${likedItems.has(highlight.id) ? 'fill-current' : ''}`} />
                    <span>{highlight.likes + (likedItems.has(highlight.id) ? 1 : 0)}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{highlight.shares}</span>
                  </button>
                </div>
                
                <button className="btn-primary text-sm py-2 px-4">
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
