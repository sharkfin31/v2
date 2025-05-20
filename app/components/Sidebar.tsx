'use client';

import { FaGithub, FaLinkedin, FaMedium, FaEnvelope } from 'react-icons/fa6';

interface SidebarProps {
  activeSection: string;
}

const Sidebar = ({ activeSection }: SidebarProps) => {
  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      document.getElementById('content-container')?.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-[var(--sidebar-width)] bg-background flex flex-col pl-[var(--sidebar-padding)] pr-8 z-10 hidden lg:flex">
      <div className="flex flex-col h-full w-full justify-between">
        {/* Name and Headline */}
        <div className="mt-16">
          <h1 className="text-xl font-bold text-accent mb-2">Shyam Sundar Ravikumar</h1>
          <p className="text-foreground">I build and fix stuff</p>
        </div>
        
        {/* Navigation - Vertically centered */}
        <nav className="mb-32">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link pl-4 relative ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Social Media Links */}
        <div className="mb-8 pr-12 flex flex-col items-center">
          <div className="flex space-x-5">
            <a href="https://github.com/sharkfin31" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/shyamsravikumar/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="https://medium.com/@shyamsravikumar" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaMedium size={20} />
            </a>
            <a href="mailto:shyamsravikumar@gmail.com" className="text-foreground hover:text-accent transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;