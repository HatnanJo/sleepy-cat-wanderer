
import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Award, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a future implementation, this would toggle actual dark mode
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-amber-600">
                sleepycat<span className="text-amber-900">.com</span>
              </span>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-amber-600">
                Home
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-amber-600">
                <Users className="w-4 h-4 mr-2" />
                Community
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-amber-600">
                <Award className="w-4 h-4 mr-2" />
                Leaderboards
              </Button>
              <Button variant="outline" className="text-gray-700 hover:text-amber-600">
                Sign In
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Sign Up
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-700 hover:text-amber-600"
              >
                {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-amber-600">
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-amber-600">
            <Users className="w-4 h-4 mr-2" />
            Community
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-amber-600">
            <Award className="w-4 h-4 mr-2" />
            Leaderboards
          </Button>
          <Button variant="outline" className="w-full justify-start text-gray-700 hover:text-amber-600">
            Sign In
          </Button>
          <Button className="w-full justify-start bg-amber-500 hover:bg-amber-600 text-white">
            Sign Up
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:text-amber-600"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-2" />
                Dark Mode
              </>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
