
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
        <div className="absolute top-0 right-0 transform -translate-y-4 translate-x-2">
          <ZzzParticle delay={0} />
          <ZzzParticle delay={1} />
          <ZzzParticle delay={2} />
        </div>
      )}
      
      {/* Cat body */}
      <div 
        className={cn(
          "w-24 h-20 bg-cat-body rounded-3xl relative",
          isSleeping ? "animate-breathing" : "animate-wake-up",
          isDragging && "shadow-lg"
        )}
      >
        {/* Cat ears */}
        <div className="absolute w-6 h-6 bg-cat-ear rounded-tl-xl rounded-br-3xl -top-3 left-2 transform -rotate-15 animate-twitch"></div>
        <div className="absolute w-6 h-6 bg-cat-ear rounded-tr-xl rounded-bl-3xl -top-3 right-2 transform rotate-15 animate-twitch"></div>
        
        {/* Cat face - always closed eyes when sleeping */}
        <div className="absolute top-7 left-0 right-0 flex justify-center items-center">
          {isSleeping ? (
            <>
              <div className="mx-2 w-3 h-0.5 bg-black rounded-full"></div>
              <div className="mx-2 w-3 h-0.5 bg-black rounded-full"></div>
            </>
          ) : (
            <>
              <div className="mx-2 w-3 h-3 bg-black rounded-full"></div>
              <div className="mx-2 w-3 h-3 bg-black rounded-full"></div>
            </>
          )}
        </div>
        
        {/* Cat nose */}
        <div className="absolute top-10 left-0 right-0 mx-auto w-2 h-1.5 bg-cat-nose rounded-full"></div>
        
        {/* Cat mouth - curved when sleeping */}
        {isSleeping ? (
          <div className="absolute top-12 left-0 right-0 mx-auto w-4 h-1 border-b border-black rounded-b-full"></div>
        ) : (
          <div className="absolute top-12 left-0 right-0 mx-auto w-1 h-1 border-b border-black"></div>
        )}
      </div>
    </div>
  );
};

export default SleepyCat;
