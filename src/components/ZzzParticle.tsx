
import React from 'react';
import { cn } from '@/lib/utils';

interface ZzzParticleProps {
  delay: number;
}

export const ZzzParticle: React.FC<ZzzParticleProps> = ({ delay }) => {
  return (
    <div 
      className={cn(
        "absolute text-lg font-bold text-white",
        "animate-float-z"
      )}
      style={{ 
        animationDelay: `${delay}s`,
        opacity: 0
      }}
    >
      Z
    </div>
  );
};
