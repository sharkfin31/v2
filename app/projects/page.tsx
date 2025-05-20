"use client";

import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

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
  {
    id: 4,
    title: "Song Genre and Hit Prediction",
    description:
      "A model trained on custom datasets constructed from song features to classify Genres and predict a song becoming a Hit",
    technologies: ["Python", "ML Algorithms"],
    link: "https://github.com/sharkfin31/Song-Genre-and-Hit-Prediction",
  },
  {
    id: 5,
    title: "Intelligent Driver Assistance System",
    description:
      "A system to identify driver emotion and drowsiness, and suggests rest stops nearby to take a break, in addition to custom generated spotify playlists",
    technologies: ["Java", "Python", "OpenCV", "Ford SDK", "Spotify API"],
    link: "https://devpost.com/software/car-infotainment-system",
  },
  {
    id: 6,
    title: "Self Driving Car Prototype",
    description:
      "An unmanned RC vehicle preprocessing camera images to detect lane lines and obstacles, and controlling steering and throttle using PID control",
    technologies: ["Python", "OpenCV", "Control System"],
    link: "https://sharkfin31.github.io/raceon-stinger/",
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

export default function ProjectsPage() {
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
      </div>
    </motion.div>
  );
}
