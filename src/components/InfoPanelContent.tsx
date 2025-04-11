
import React from 'react';
import { Info, Zap, Share2, Palette } from 'lucide-react';

const InfoPanelContent = () => {
  return (
    <div className="p-6 max-w-md">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="text-amber-600 w-5 h-5" />
        <h2 className="text-xl font-bold text-amber-800">Welcome to sleepycat.com!</h2>
      </div>
      
      <p className="mb-4 text-gray-700">
        Your purr-fect screen companion is here! This sleepy cat will keep you company while you work.
      </p>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-start">
          <Zap className="text-amber-500 w-5 h-5 mr-2 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-700">Interactive</h3>
            <p className="text-sm text-gray-600">Click and drag to move the cat around your screen.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Palette className="text-amber-500 w-5 h-5 mr-2 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-700">Customizable</h3>
            <p className="text-sm text-gray-600">More customization options coming soon!</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Share2 className="text-amber-500 w-5 h-5 mr-2 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-700">Shareable</h3>
            <p className="text-sm text-gray-600">Community features coming soon!</p>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 italic">
        Pet responsibly - we're not responsible for decreased productivity.
      </div>
    </div>
  );
};

export default InfoPanelContent;
