'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ExpandTransition from "./ExpandTransition";
import { FaBriefcase } from "react-icons/fa6";

const experienceData = [
  {
    id: 1,
    company: 'Expedia Group, Seattle',
    position: 'Software Development Engineer',
    duration: 'Jan 2023 - Present',
    technologies: ['Kotlin', 'Java', 'Scala', 'TypeScript', 'SpringBoot', 'Spark', 'Airflow', 'Kafka', 'Collibra'],
    link: '',
  },
  {
    id: 2,
    company: 'Collins Aerospace, Iowa',
    position: 'Software Engineer',
    duration: 'Feb 2021 - Dec 2022',
    technologies: ['C++', 'Python', 'ELK Stack', 'AWS'],
    link: 'https://www.collinsaerospace.com/what-we-do/industries/commercial-aviation/connected-cockpit/fomax',
  },
  {
    id: 3,
    company: 'Collins Aerospace, Iowa',
    position: 'Full Stack Developer Intern',
    duration: 'Jun 2020 - Dec 2020',
    technologies: ['C++', 'OpenGL', 'Python', 'Flask'],
    link: 'https://www.collinsaerospace.com/what-we-do/industries/business-aviation/cabin/content-and-entertainment/airshow-moving-maps',
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

const Experience = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const router = useRouter();

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
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {experienceData.map((job) => (
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
    </motion.div>
  );
};

export default Experience;