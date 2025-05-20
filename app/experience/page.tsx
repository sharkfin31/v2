'use client';

import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const experienceData = [
  {
    id: 1,
    company: 'Expedia Group, Seattle',
    position: 'Software Development Engineer II',
    duration: 'Jan 2023 - Present',
    description: 'Architecting and developing solutions for Messaging Experimentation for Expedia Group',
    responsibilities: [
      'Redesigned legacy Messaging Experimentation Analytics Pipelines. Execution failures reduced by 60%, Execution costs reduced by 30%',
      'Architected and implemented a data ingestion pipeline for Salesforce-based Marketing campaigns. Accelerating decision-making by 15%',
      'Developed a Proactive Alerting application for experiment monitoring. Incident detection time reduced by 40%',
      'Designed and created a Tracking pipeline to ingest user engagement data from Salesforce for Mobile Push Notifications',
    ],
    technologies: ['Kotlin', 'Java', 'Scala', 'React', 'TypeScript', 'SpringBoot', 'Spark', 'Airflow', 'Kafka', 'Collibra', 'Tableau'],
    link: '',
  },
  {
    id: 2,
    company: 'Collins Aerospace, Iowa',
    position: 'Software Engineer',
    duration: 'Feb 2021 - Dec 2022',
    description: 'Developed system software for modules part of the avionics systems onboard Airbus aircrafts',
    responsibilities: [
      'Developed modules for Traffic Data Handler module on the Aircraft Interface Device. Improved real-time data processing by 50%',
      'Designed and implemented Autmoated Log Analysis. Reduced syslog investigation time by 60% by facilitating automated anomaly detection',
      '2022 Raytheon AWS DeepRacer League Winner with a track completion time of 8.69s (World Record: 7.44s). Demonstrated expertise in reinforcement learning applications',
    ],
    technologies: ['C++', 'Python', 'ELK Stack', 'AWS'],
    link: 'https://www.collinsaerospace.com/what-we-do/industries/commercial-aviation/connected-cockpit/fomax',
  },
  {
    id: 3,
    company: 'Collins Aerospace, Iowa',
    position: 'Full Stack Developer Intern',
    duration: 'Jun 2020 - Dec 2020',
    description: 'Built new views for In-flight infotainment systems that are serving millions of travelers across the globe',
    responsibilities: [
      'Revamped UI components in the ASXi Interactive Moving Maps Software. Reduced software load time by 30% enhancing the passenger experience',
      'Integrated additional real-time sensor data to the Flight Data Simulator, improving simulation accuracy by 25% during system testing',
      'Automated software testing, boosting development efficiency by 20% and enforcing code quality standards through static analysis',
    ],
    technologies: ['C++', 'OpenGL', 'Python', 'Flask'],
    link: 'https://www.collinsaerospace.com/what-we-do/industries/business-aviation/cabin/content-and-entertainment/airshow-moving-maps',
  },
  {
    id: 4,
    company: 'IISc Bangalore, India',
    position: 'Project Assistant, Indigenous 5G Testbed Initiative',
    duration: 'Jul 2018 - Dec 2018',
    description: 'Contributed towards the development of PHY and MAC layers for the Indigenous 5G Testbed of India',
    responsibilities: [
      'Built transport channel blocks and benchmarked performance for integration to higher layers of the protocol stack',
    ],
    technologies: ['C++', 'Python', 'Linux Kernels'],
    link: 'https://ece.iisc.ac.in/~5G-Testbed/index.html',
  },
  {
    id: 5,
    company: 'IIT Delhi, India',
    position: 'Research Assistant to Dr. Anuj Dhawan',
    duration: 'Dec 2017 - May 2018',
    description: 'Explored the thermal characteristics of different material substrates for Nanostructured sensors',
    responsibilities: [
      'Automated a 3-axis Motorized Translational stage using LabVIEW for remote access and analyses',
      'Performed Spectroscopic analysis of Nanostructured sensors through a range of different temperatures',
    ],
    technologies: ['Raman Spectroscopy', 'LabVIEW'],
    link: '',
  },
  {
    id: 6,
    company: 'IIT Madras, Chennai, India',
    position: 'Research Assistant to Dr. Giridhar K',
    duration: 'May 2017 - July 2017',
    description: 'Learning Wireless Communications through research on LTE networks',
    responsibilities: [
      'Designed an OFDM Link with FFT based Interpolation for Channel Estimation and analyzed the Error performance',
      'Constructed an optimal Frame structure of Physical Random Access Channel for Ranging in LTE networks',
    ],
    technologies: ['MATLAB', 'C++'],
    link: '',
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

export default function ExperiencePage() {
  const router = useRouter();

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
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-heading mb-3">Key Responsibilities:</h3>
                <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                  {job.responsibilities.map((responsibility, index) => (
                    <li className="text-sm" key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              
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
      </div>
    </motion.div>
  );
}