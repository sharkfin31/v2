'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ExpandTransition from "./ExpandTransition";
import { FaPenFancy } from "react-icons/fa6";

const blogData = [
  {
    id: 1,
    title: 'Think Small',
    excerpt: 'There’s a subtle irony in software engineering: we often Dream Big but fail to Ship Small. We architect for scale before we even have users.',
    date: 'May 11, 2025',
    readTime: '3 min read',
    link: 'https://medium.com/@shyamsravikumar/think-small-5a85a5f2011f',
  },
  {
    id: 2,
    title: '5 Lessons I Learned (That I Wish I Knew Sooner)',
    excerpt: 'When I first started my career as a software engineer, I believed that the most challenging aspects would be mastering new programming languages, debugging complex issues, and getting past technical interviews.',
    date: 'May 2, 2025',
    readTime: '4 min read',
    link: 'https://medium.com/@shyamsravikumar/5-lessons-i-learned-that-i-wish-i-knew-sooner-7736e17fb008',
  },
  {
    id: 3,
    title: 'State Management in React',
    excerpt: 'Comparing different state management solutions in React applications.',
    date: 'April 10, 2023',
    readTime: '7 min read',
    link: '/blog/state-management-react',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Blog = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (link: string) => {
    window.open(link, "_blank");
  };

  const handleViewMore = () => {
    setIsExpanding(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl text-heading mb-8 flex items-center gap-2"><FaPenFancy /> Blog</h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {blogData.map((post) => (
          <motion.div 
            key={post.id} 
            variants={item}
            className="card show-arrow group cursor-pointer"
            onClick={() => handleCardClick(post.link)}
          >
            <h3 className="text-lg font-medium text-heading mb-2 hover:text-accent transition-colors">
              {post.title}
            </h3>

            <p className="text-sm text-foreground mb-4 max-w-[93%]">
              {post.excerpt.slice(0, isMobile ? 60 : 120)}{post.excerpt.length > (isMobile ? 60 : 120) && '...'}
            </p>
            <div className="flex items-center text-xs text-foreground">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
            
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-8 text-center">
        <button
          onClick={handleViewMore}
          className="view-more-btn"
        >
          View more
        </button>

        <ExpandTransition
          isExpanding={isExpanding}
          onAnimationComplete={() => router.push("/blog")}
        >
          <div />
        </ExpandTransition>
      </div>
    </motion.div>
  );
};

export default Blog;