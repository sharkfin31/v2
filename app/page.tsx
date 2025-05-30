'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Experience from './components/Experience';
import Education from './components/Education';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [activeSection, setActiveSection] = useState('projects');
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to check which section is in view
  const checkActiveSection = () => {
    const sections = ['projects', 'blog', 'experience', 'education'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;
      
      const rect = element.getBoundingClientRect();
      // If the top of the element is in the viewport
      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection(section);
        break;
      }
    }
  };

  const handleSectionChange = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      document.getElementById('content-container')?.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Add scroll event listener
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
      contentContainer.addEventListener('scroll', checkActiveSection);
    }
    
    // Initial check
    checkActiveSection();
    
    // Cleanup
    return () => {
      if (contentContainer) {
        contentContainer.removeEventListener('scroll', checkActiveSection);
      }
    };
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen overflow-hidden bg-background"
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Hamburger Menu Button */}
      <button 
        onClick={toggleMenu}
        className="fixed top-6 right-6 p-2 text-foreground z-30 lg:hidden"
        aria-label="Toggle menu"
      >
        <FaBars size={20} />
      </button>
      
      {/* Mobile Menu */}
      <MobileMenu 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      
      {/* Fixed Sidebar */}
      <Sidebar activeSection={activeSection} />
      
      {/* Scrollable Content */}
      <div 
        id="content-container"
        className="flex-1 overflow-y-auto content-scrollbar ml-0 lg:ml-[var(--sidebar-width)] scroll-smooth snap-y snap-mandatory"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">
          <section id="projects" className="section">
            <Projects />
          </section>
          
          <section id="blog" className="section">
            <Blog />
          </section>
          
          <section id="experience" className="section">
            <Experience />
          </section>
          
          <section id="education" className="section">
            <Education />
          </section>
        </div>
      </div>
    </motion.main>
  );
}