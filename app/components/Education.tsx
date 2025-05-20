'use client';

// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import ExpandTransition from "./ExpandTransition";
import { motion } from 'framer-motion';
import { FaUserGraduate } from 'react-icons/fa6';

const educationData = [
  {
    id: 1,
    institution: 'University of Southern California',
    degree: 'Master of Science in Electrical Engineering',
    duration: '2019 - 2020',
    cgpa: '3.57 / 4.0',
    courses: ['Deep Learning', 'Machine Learning', 'Data Science'],
  },
  {
    id: 2,
    institution: 'PSG College of Technology',
    degree: 'Bachelors in Electonics and Communication Engineering',
    duration: '2014 - 2018',
    cgpa: '8.48 / 10.0',
    courses: ['Wireless Communications', 'Database Systems'],
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

const Education = () => {
  // const [isExpanding, setIsExpanding] = useState(false);
  // const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl text-heading mb-8 flex items-center gap-2"><FaUserGraduate /> Education</h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {educationData.map((edu) => (
          <motion.div 
            key={edu.id} 
            variants={item}
            className="card group">
            
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <h3 className="text-lg font-medium text-heading">{edu.degree}</h3>
              <span className="text-accent text-sm">{edu.duration}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <p className="text-sm text-foreground mb-2">{edu.institution}</p>
              <span className="text-foreground text-xs">{edu.cgpa}</span>
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-heading mb-2">Relevant Courses:</h4>
              <div className="flex flex-wrap gap-2">
                {edu.courses.map((course, index) => (
                  <span key={index} className="text-xs bg-secondary text-foreground px-3 py-1 rounded-full">
                    {course}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>
      
      {/* <div className="mt-8 text-center">
        <button
          onClick={handleCardClick}
          className="view-more-btn text-sm"
        >
          View more
        </button>
        
        <ExpandTransition
          isExpanding={isExpanding}
          onAnimationComplete={() => router.push("/education")}
        >
          <div />
        </ExpandTransition>
      </div> */}
    </motion.div>
  );
};

export default Education;