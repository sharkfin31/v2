'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ExpandTransition from "./ExpandTransition";
import { FaCode } from "react-icons/fa6";

const projectsData = [
  {
    id: 1,
    title: "Yelp Recommendation System",
    description:
      "A model trained on Yelp’s dataset to predict user ratings for new businesses, achieving an RMSE of 1.19 with XGBoost and User based Collaborative Filtering",
    technologies: ["Python", "Spark", "XGBoost"],
    link: "https://github.com/sharkfin31/Yelp-Recommendation-System",
  },
  {
    id: 2,
    title: "Whole Foods Delivery Slot Checker",
    description:
      "An automated script that notifies users of available delivery slots from Whole Foods at times of high demand during the COVID-19 pandemic",
    technologies: ["Python", "Selenium", "BeautifulSoup4"],
    link: "https://github.com/sharkfin31/Whole-Foods-Delivery-Slot-Checker",
  },
  {
    id: 3,
    title: "3D Reconstruction of Objects from Single 2D Image",
    description:
      "Researched and implemented 2.5D Prior Estimation and 3D Generation of furniture models with GANs and Autoencoders",
    technologies: ["PyTorch", "OpenCV", "ResNet-18", "Android SDK"],
    link: "https://sharkfin31.github.io/DeepVision/",
  },
];

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
      <h2 className="text-xl text-heading mb-8 flex items-center gap-2"><FaCode /> Projects</h2>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
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
    </motion.div>
  );
};

export default Projects;