import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Share2, Heart } from 'lucide-react';

const BlogPostView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(124);
  const [hasLiked, setHasLiked] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };
  
  const handleShare = async () => {
    setShareTooltip(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'The Evolution of Minimalist Design in Modern Web Development',
          text: 'Check out this interesting article about minimalist design trends.',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => setShareTooltip(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-64 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-48 w-96 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen transition-opacity duration-500 ease-in-out opacity-100">
      {/* Main content */}
      <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8 animate-fade-in">
        {/* Post header */}
        <div className="mb-8 opacity-0 animate-slide-up" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">The Evolution of Minimalist Design in Modern Web Development</h1>
          <div className="flex items-center text-gray-500 text-sm space-x-4">
            <span className="flex items-center"><Calendar size={14} className="mr-1" /> March 10, 2025</span>
            <span className="flex items-center"><Clock size={14} className="mr-1" /> 5 min read</span>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-sm opacity-0 animate-slide-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
          <img 
            src="/api/placeholder/800/400" 
            alt="Minimalist design showcase" 
            className="w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-700"
          />
        </div>
        
        {/* Blog content */}
        <div className="prose max-w-none opacity-0 animate-slide-up" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
          <p className="text-lg leading-relaxed text-gray-800 mb-4">
            Minimalist design has come a long way since its inception in the early web. What started as a necessity due to bandwidth constraints has evolved into a deliberate aesthetic choice that focuses on content clarity, user experience, and performance.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-800 mb-4">
            Today, we're seeing a renaissance of minimalism that incorporates subtle animations, thoughtful interactions, and intelligent use of white space. This approach isn't about stripping away features, but rather about presenting them in the most intuitive and unobtrusive way possible.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Principles of Modern Minimalism</h2>
          
          <p className="text-lg leading-relaxed text-gray-800 mb-4">
            The most effective minimalist interfaces follow principles that balance aesthetics with functionality. These designs use purposeful animations to guide user attention, create visual hierarchy without clutter, and embrace negative space as an active design element rather than absence.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-800">
            Perhaps most importantly, they understand that simplicity isn't the same as simplistic. The goal is to make complex interactions feel natural and intuitive, hiding complexity beneath a calm surface.
          </p>
        </div>
        
        {/* Simplified action bar with just like and share */}
        <div className="border-t mt-12 pt-4 flex justify-end items-center opacity-0 animate-slide-up" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
          <div className="flex space-x-4">
            <button 
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              onClick={handleLike}
              aria-label="Like this article"
            >
              <Heart 
                size={18} 
                className={`mr-1 transition-all ${hasLiked ? 'fill-red-500 text-red-500 scale-110' : ''}`} 
              />
              <span>{likes}</span>
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
                onClick={handleShare}
                aria-label="Share this article"
              >
                <Share2 size={18} />
              </button>
              
              {shareTooltip && (
                <div className="absolute bottom-full mb-2 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Link copied!
                  <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related posts */}
        <div className="mt-16 opacity-0 animate-slide-up" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
          <h3 className="text-xl font-semibold mb-4">You might also enjoy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer hover:translate-y-[-2px] transition-transform duration-300">
              <h4 className="font-medium">Responsive Design Patterns for Modern Applications</h4>
              <p className="text-gray-500 text-sm mt-1">March 2, 2025 · 4 min read</p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer hover:translate-y-[-2px] transition-transform duration-300">
              <h4 className="font-medium">Accessibility in Minimalist UIs: Best Practices</h4>
              <p className="text-gray-500 text-sm mt-1">February 25, 2025 · 6 min read</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BlogPostView;