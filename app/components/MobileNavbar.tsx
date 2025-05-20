'use client';

import { FaBars } from 'react-icons/fa';

interface MobileNavbarProps {
  toggleMenu: () => void;
}

const MobileNavbar = ({ toggleMenu }: MobileNavbarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-18 bg-background/80 backdrop-blur-md z-30 flex items-center lg:hidden">
      <div className="flex-1 flex ml-8 justify-center">
        <h1 className="text-xl mt-4 mr-8 font-medium text-heading">Shark</h1>
      </div>
      <button 
        onClick={toggleMenu}
        className="absolute top-6 right-6 p-2 text-foreground" // Added absolute positioning
        aria-label="Toggle menu"
      >
        <FaBars size={20} />
      </button>
    </div>
  );
};

export default MobileNavbar;