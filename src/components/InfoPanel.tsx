
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import InfoPanelContent from './InfoPanelContent';

const InfoPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Info button */}
      <Button
        className="fixed bottom-4 right-4 h-10 w-10 rounded-full shadow-lg bg-white hover:bg-white/90 text-amber-600"
        size="icon"
        onClick={toggleOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Info className="h-5 w-5" />}
      </Button>

      {/* Info panel content */}
      <div
        className={cn(
          "fixed bottom-16 right-4 w-full max-w-sm transform transition-all duration-300 ease-out shadow-xl rounded-xl bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 border border-amber-200 overflow-hidden",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        )}
      >
        <InfoPanelContent />
      </div>
    </>
  );
};

export default InfoPanel;
