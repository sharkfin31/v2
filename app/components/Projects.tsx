'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ExpandTransition from "./ExpandTransition";
import { FaCode } from "react-icons/fa6";
import { supabase, Project } from "@/lib/supabase";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const Projects = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: false });
          
        if (error) throw error;
        if (data && data.length > 0) {
          setProjectsData(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl text-heading mb-8 flex items-center gap-2"><FaCode /> Projects</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      ) : projectsData.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {projectsData.slice(0, 3).map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="card show-arrow group cursor-pointer"
              onClick={() => handleCardClick(project.link)}
            >
              <h3 className="text-lg font-medium text-heading mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-foreground mb-4 max-w-[93%]">
                {project.description.slice(0, isMobile ? 30 : 80)}
                {project.description.length > (isMobile ? 30 : 80) && '...'}
              </p>

              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-secondary text-foreground px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8">No projects found</div>
      )}

      {projectsData.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleViewMore}
            className="view-more-btn"
          >
            View more
          </button>

          <ExpandTransition
            isExpanding={isExpanding}
            onAnimationComplete={() => router.push("/projects")}
          >
            <div />
          </ExpandTransition>
        </div>
      )}
    </motion.div>
  );
};

export default Projects;