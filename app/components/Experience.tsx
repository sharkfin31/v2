'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ExpandTransition from "./ExpandTransition";
import { FaBriefcase } from "react-icons/fa6";
import { supabase, Experience as ExperienceType } from "@/lib/supabase";

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

const Experience = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [experienceData, setExperienceData] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleViewMore = () => {
    setIsExpanding(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl text-heading mb-8 flex items-center gap-2"><FaBriefcase /> Experience</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse">Loading experiences...</div>
        </div>
      ) : experienceData.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {experienceData.slice(0, 3).map((job) => (
            <motion.div 
              key={job.id} 
              variants={item}
              className={`card group ${job.link && job.link !== '' ? 'cursor-pointer' : ''}`}
              onClick={() => handleCardClick(job.link)}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                <h3 className="text-lg font-medium text-heading">{job.position}</h3>
                <span className="text-foreground text-sm">{job.duration}</span>
              </div>
              <p className="text-sm text-accent mb-4">{job.company}</p>
              
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, index) => (
                  <span key={index} className="text-xs bg-secondary text-foreground px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8">No experience data found</div>
      )}
      
      {experienceData.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleViewMore}
            className="view-more-btn"
          >
            View more
          </button>
          
          <ExpandTransition
            isExpanding={isExpanding}
            onAnimationComplete={() => router.push("/experience")}
          >
            <div />
          </ExpandTransition>
        </div>
      )}
    </motion.div>
  );
};

export default Experience;