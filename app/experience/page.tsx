'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase, Experience } from "@/lib/supabase";

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

export default function ExperiencePage() {
  const router = useRouter();
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('id', { ascending: false });
          
        if (error) throw error;
        if (data && data.length > 0) {
          setExperienceData(data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleCardClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl text-accent mb-8 mt-12 text-center"
        >
          Work
        </motion.h1>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse">Loading experiences...</div>
          </div>
        ) : experienceData.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 md:space-y-12"
          >
            {experienceData.map((job) => (
              <motion.div 
                key={job.id} 
                variants={item}
                className={`card group ${job.link && job.link !== '' ? 'cursor-pointer' : ''}`}
                onClick={() => job.link && job.link !== '' ? handleCardClick(job.link) : null}>

                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <h2 className="text-xl font-medium text-heading">{job.position}</h2>
                  <span className="text-accent text-sm mt-1 sm:mt-0">{job.duration}</span>
                </div>
                <p className="text-lg text-accent mb-4">{job.company}</p>
                <p className="text-sm text-foreground/80 mb-6">{job.description}</p>
                
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-heading mb-3">Key Responsibilities:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                      {job.responsibilities.map((responsibility, index) => (
                        <li className="text-sm" key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="text-md font-medium text-heading mb-3">Technologies Used:</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, index) => (
                      <span key={index} className="text-xs bg-secondary text-foreground px-3 py-1 mb-2 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">No experience data found</div>
        )}
      </div>
    </motion.div>
  );
}