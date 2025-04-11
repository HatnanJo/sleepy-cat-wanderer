
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';

const InfoPanel = () => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="fixed bottom-5 left-5 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs z-40 border border-purple-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-purple-800">Sleepy Cat</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        Drag the cat to move it around. It will wake up when moved and fall back asleep after a few seconds.
      </p>
      <div className="text-xs text-gray-500">
        Click anywhere outside the cat to place it there ✨
      </div>
    </div>
  ) : (
    <Button 
      className="fixed bottom-5 left-5 z-40 bg-white/80 hover:bg-white/90 text-purple-800 backdrop-blur-sm border border-purple-100"
      size="icon"
      onClick={() => setIsVisible(true)}
    >
      <Info className="h-4 w-4" />
    </Button>
  );
};

export default InfoPanel;
