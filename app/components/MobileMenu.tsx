'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ activeSection, onSectionChange, isOpen, onClose }: MobileMenuProps) => {
  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
  ];

  const handleNavClick = (id: string) => {
    onSectionChange(id);
  };

  return (
    <div className={`mobile-sidebar ${isOpen ? 'open' : 'closed'} p-8 left-0`}>
      <button 
        onClick={onClose}
        className="close-btn"
        aria-label="Close"
      >
        <FaTimes size={20} />
      </button>
      
      <div className="flex flex-col h-full">
        <div className="absolute top-4 left-4">
          <ThemeToggle isMobile={true} />
        </div>
        <div className="mb-12 mt-16">
          <h1 className="text-2xl font-bold text-accent mb-2">Shyam Sundar Ravikumar</h1>
          <p className="text-foreground">I build and fix stuff</p>
        </div>
        
        <nav className="mt-36 flex flex-col items-center">
          <ul className="space-y-6 justify-center text-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`text-lg ${activeSection === item.id ? 'text-accent font-medium' : 'text-foreground'}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto mb-8 flex flex-col items-center">
          <div className="flex space-x-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="mailto:your.email@example.com" className="text-foreground hover:text-accent transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;