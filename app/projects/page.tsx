"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
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

export default function ProjectsPage() {
  const router = useRouter();
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleCardClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground p-4"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="close-btn"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl text-accent mb-8 mt-12 text-center"
        >
          Projects
        </motion.h2>
        <br></br>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        ) : projectsData.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="card show-arrow group cursor-pointer"
                onClick={() => handleCardClick(project.link)}
              >
                <h3 className="text-lg font-medium text-heading mb-2">
                  {project.title}
                </h3>
                <p className="text-foreground text-sm mb-4 max-w-[90%]">
                  {project.description}
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
      </div>
    </motion.div>
  );
}