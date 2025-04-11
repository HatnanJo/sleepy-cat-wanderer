
import React, { useEffect, useState } from 'react';
import SleepyCat from '@/components/SleepyCat';
import InfoPanel from '@/components/InfoPanel';

const Index = () => {
  const [nightMode, setNightMode] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);

  // Generate stars for the background
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const starCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.2 + 0.1,
          opacity: Math.random() * 0.5 + 0.25
        });
      }
      
      setStars(newStars);
    };

    generateStars();
    
    // Auto-detect night mode based on time of day
    const hour = new Date().getHours();
    setNightMode(hour < 6 || hour > 18);
    
    // Recalculate stars when window is resized
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, []);

  return (
    <div 
      className={`min-h-screen w-full overflow-hidden relative transition-colors duration-1000 ${
        nightMode 
          ? 'bg-gradient-to-b from-indigo-900 via-purple-900 to-purple-800' 
          : 'bg-gradient-to-b from-blue-100 via-purple-100 to-purple-200'
      }`}
    >
      {/* Stars (visible only at night) */}
      {nightMode && stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            opacity: star.opacity,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
      
      {/* Moon or sun */}
      <div 
        className={`absolute transition-all duration-1000 rounded-full ${
          nightMode 
            ? 'bg-gray-200 right-10 top-10 w-16 h-16 shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.2)]' 
            : 'bg-yellow-300 left-10 top-10 w-20 h-20 shadow-xl'
        }`}
      />
      
      {/* Clouds (only visible during day) */}
      {!nightMode && (
        <>
          <div className="absolute left-[10%] top-[15%] w-24 h-8 bg-white/80 rounded-full animate-float" 
               style={{ animationDelay: '0.5s' }} />
          <div className="absolute left-[5%] top-[18%] w-16 h-6 bg-white/80 rounded-full animate-float"
               style={{ animationDelay: '1.2s' }} />
          <div className="absolute right-[15%] top-[25%] w-20 h-7 bg-white/80 rounded-full animate-float"
               style={{ animationDelay: '0.7s' }} />
        </>
      )}
      
      {/* Surface for the cat to rest on */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-24 transition-colors duration-1000 ${
          nightMode 
            ? 'bg-purple-800' 
            : 'bg-purple-200'
        }`}
      />
      
      {/* Our sleepy cat component */}
      <SleepyCat />
      
      {/* Info panel */}
      <InfoPanel />
    </div>
  );
};

export default Index;
