
import React from 'react';
import { cn } from '@/lib/utils';

interface ZzzParticleProps {
  delay: number;
}

export const ZzzParticle: React.FC<ZzzParticleProps> = ({ delay }) => {
  return (
    <div 
      className={cn(
        "absolute text-lg font-bold text-amber-900",
        "animate-float-z"
      )}
      style={{ 
        animationDelay: `${delay}s`,
        opacity: 0,
        textShadow: '0 0 2px rgba(255,255,255,0.7)'
      }}
    >
      Z
    </div>
  );
};
