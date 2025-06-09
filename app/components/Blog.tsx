'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ExpandTransition from "./ExpandTransition";
import { FaPenFancy } from "react-icons/fa6";
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
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Blog = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const formatReadTime = (minutes: number) => {
    return `${minutes} min read`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl text-heading mb-8 flex items-center gap-2"><FaPenFancy /> Blog</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse">Loading blog posts...</div>
        </div>
      ) : blogData.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {blogData.slice(0, 3).map((post) => (
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
                <span>{formatReadTime(post.readTime)}</span>
              </div>
              
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8">No blog posts found</div>
      )}
      
      {blogData.length > 0 && (
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
      )}
    </motion.div>
  );
};

export default Blog;