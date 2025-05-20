'use client';

import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
  {
    id: 4,
    title: 'Building Accessible Web Applications',
    excerpt: 'Best practices for creating accessible and inclusive web experiences.',
    date: 'March 5, 2023',
    readTime: '6 min read',
    link: '/blog/accessible-web-applications',
  },
  {
    id: 5,
    title: 'Optimizing React Performance',
    excerpt: 'Techniques to improve the performance of your React applications.',
    date: 'February 18, 2023',
    readTime: '8 min read',
    link: '/blog/optimizing-react-performance',
  },
  {
    id: 6,
    title: 'Introduction to TypeScript',
    excerpt: 'Why you should consider using TypeScript in your next project.',
    date: 'January 30, 2023',
    readTime: '5 min read',
    link: '/blog/introduction-to-typescript',
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
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function BlogPage() {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground p-8"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.push('/')}
          className="close-btn"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl text-accent mb-8 mt-12 text-center"
        >
          Blog
        </motion.h1>
        <br></br>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6"
        >
          {blogData.map((post) => (
            <motion.div 
              key={post.id} 
              variants={item}
              className="card show-arrow group"
              onClick={() => handleCardClick(post.link)}
            >
              <h3 className="text-lg font-medium text-heading mb-2">
                {post.title}
              </h3>
              <p className="text-foreground text-sm mb-4">{post.excerpt.substring(0, 100)}...</p>
              <div className="flex items-center text-sm text-foreground">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}