'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase, BlogPost } from "@/lib/supabase";

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
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog')
          .select('*')
          .order('id', { ascending: false });
          
        if (error) throw error;
        if (data && data.length > 0) {
          setBlogData(data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  const formatReadTime = (minutes: number) => {
    return `${minutes} min read`;
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
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse">Loading blog posts...</div>
          </div>
        ) : blogData.length > 0 ? (
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
                  <span>{formatReadTime(post.readTime)}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">No blog posts found</div>
        )}
      </div>
    </motion.div>
  );
}