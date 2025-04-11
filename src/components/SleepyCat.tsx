
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ZzzParticle } from './ZzzParticle';

interface SleepyCatProps {
  className?: string;
}

const SleepyCat: React.FC<SleepyCatProps> = ({ className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSleeping, setIsSleeping] = useState(true);
  const [showZs, setShowZs] = useState(true);
  const catRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const sleepTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Initialize to center of screen
  useEffect(() => {
    if (isInitialMount.current && catRef.current) {
      const x = Math.max(0, (window.innerWidth / 2) - (catRef.current.clientWidth / 2));
      const y = Math.max(0, (window.innerHeight / 2) - (catRef.current.clientHeight / 2));
      setPosition({ x, y });
      isInitialMount.current = false;
    }
  }, []);

  // Set up sleep timer
  const resetSleepTimer = () => {
    if (sleepTimeoutRef.current) {
      clearTimeout(sleepTimeoutRef.current);
    }
    
    sleepTimeoutRef.current = setTimeout(() => {
      setIsSleeping(true);
      setTimeout(() => setShowZs(true), 1000); // Delay Zs coming back
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (sleepTimeoutRef.current) {
        clearTimeout(sleepTimeoutRef.current);
      }
    };
  }, []);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (catRef.current) {
      const rect = catRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setIsDragging(true);
      
      if (isSleeping) {
        setIsSleeping(false);
        setShowZs(false);
      }
      
      resetSleepTimer();
    }
  };

  // Handle drag movement
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && catRef.current) {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      
      // Make sure cat stays within viewport
      const maxX = window.innerWidth - catRef.current.clientWidth;
      const maxY = window.innerHeight - catRef.current.clientHeight;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={catRef}
      className={cn(
        "absolute select-none",
        isDragging ? "cursor-grabbing z-50" : "cursor-grab z-10",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        if (catRef.current) {
          const touch = e.touches[0];
          const rect = catRef.current.getBoundingClientRect();
          dragOffset.current = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          };
          setIsDragging(true);
          
          if (isSleeping) {
            setIsSleeping(false);
            setShowZs(false);
          }
          
          resetSleepTimer();
        }
      }}
      onTouchMove={(e) => {
        if (isDragging && catRef.current) {
          const touch = e.touches[0];
          const newX = touch.clientX - dragOffset.current.x;
          const newY = touch.clientY - dragOffset.current.y;
          
          const maxX = window.innerWidth - catRef.current.clientWidth;
          const maxY = window.innerHeight - catRef.current.clientHeight;
          
          setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
          });
          
          e.preventDefault(); // Prevent scrolling while dragging
        }
      }}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Z particles floating above cat when sleeping */}
      {showZs && isSleeping && (
        <div className="absolute -top-6 right-0 transform">
          <ZzzParticle delay={0} />
          <ZzzParticle delay={1} />
          <ZzzParticle delay={2} />
        </div>
      )}
      
      {/* Ghibli-style Cat - Full Body */}
      <div className={cn(
        "relative",
        isSleeping ? "animate-breathing" : "animate-wake-up"
      )}>
        {/* Cat body - Ghibli style */}
        <div className="relative w-32 h-16">
          {/* Main body - orange colored */}
          <div className="absolute bottom-0 w-32 h-14 bg-orange-300 rounded-3xl shadow-md"></div>
          
          {/* Tail */}
          <div className="absolute bottom-5 -left-8 w-12 h-4 bg-orange-300 rounded-l-full shadow-sm transform rotate-6"></div>
          
          {/* Legs - when sleeping, tucked under */}
          {isSleeping ? (
            <>
              <div className="absolute bottom-0 left-4 w-5 h-2 bg-orange-200 rounded-b-md shadow-inner"></div>
              <div className="absolute bottom-0 right-4 w-5 h-2 bg-orange-200 rounded-b-md shadow-inner"></div>
            </>
          ) : (
            <>
              <div className="absolute bottom-0 left-5 w-4 h-4 bg-orange-300 rounded-b-md shadow-sm"></div>
              <div className="absolute bottom-0 left-10 w-4 h-4 bg-orange-300 rounded-b-md shadow-sm"></div>
              <div className="absolute bottom-0 right-5 w-4 h-4 bg-orange-300 rounded-b-md shadow-sm"></div>
              <div className="absolute bottom-0 right-10 w-4 h-4 bg-orange-300 rounded-b-md shadow-sm"></div>
            </>
          )}
          
          {/* Head */}
          <div className="absolute top-0 left-4 w-20 h-16 bg-orange-300 rounded-t-3xl shadow-md">
            {/* Ears */}
            <div className="absolute -top-3 left-2 w-5 h-6 bg-orange-400 rounded-tl-xl rounded-tr-xl transform -rotate-6 animate-twitch"></div>
            <div className="absolute -top-3 right-2 w-5 h-6 bg-orange-400 rounded-tl-xl rounded-tr-xl transform rotate-6 animate-twitch"></div>
            
            {/* Inner ears */}
            <div className="absolute -top-2 left-3 w-3 h-3 bg-orange-200 rounded-tl-xl transform -rotate-6"></div>
            <div className="absolute -top-2 right-3 w-3 h-3 bg-orange-200 rounded-tr-xl transform rotate-6"></div>
            
            {/* Face - always closed eyes when sleeping */}
            <div className="absolute top-7 left-0 right-0 flex justify-center items-center">
              {isSleeping ? (
                <>
                  <div className="mx-3 w-2 h-0.5 bg-amber-950 rounded-full"></div>
                  <div className="mx-3 w-2 h-0.5 bg-amber-950 rounded-full"></div>
                </>
              ) : (
                <>
                  <div className="mx-3 w-2 h-2 bg-amber-950 rounded-full"></div>
                  <div className="mx-3 w-2 h-2 bg-amber-950 rounded-full"></div>
                </>
              )}
            </div>
            
            {/* Nose */}
            <div className="absolute top-9 left-0 right-0 mx-auto w-2 h-1.5 bg-amber-600 rounded-full"></div>
            
            {/* Mouth - curved when sleeping */}
            {isSleeping ? (
              <div className="absolute top-11 left-0 right-0 mx-auto w-4 h-1 border-b border-amber-700 rounded-b-full"></div>
            ) : (
              <div className="absolute top-11 left-0 right-0 mx-auto w-1 h-1 border-b border-amber-700"></div>
            )}
            
            {/* Whiskers */}
            <div className="absolute top-10 left-1 w-5 h-0.5 bg-orange-100 transform -rotate-6"></div>
            <div className="absolute top-11 left-0 w-6 h-0.5 bg-orange-100 transform rotate-2"></div>
            <div className="absolute top-10 right-1 w-5 h-0.5 bg-orange-100 transform rotate-6"></div>
            <div className="absolute top-11 right-0 w-6 h-0.5 bg-orange-100 transform -rotate-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepyCat;
