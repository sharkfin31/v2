"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const educationData = [
  {
    id: 1,
    institution: "University of Technology",
    degree: "Master of Computer Science",
    duration: "2020 - 2022",
    description:
      "Specialized in Human-Computer Interaction and Web Technologies.",
    achievements: [
      "Graduated with distinction (GPA: 3.9/4.0)",
      "Published research paper on web accessibility",
      "Teaching assistant for Web Development course",
    ],
    courses: [
      "Advanced Algorithms",
      "Machine Learning",
      "UI/UX Design",
      "Advanced Web Technologies",
      "Research Methods",
    ],
  },
  {
    id: 2,
    institution: "State University",
    degree: "Bachelor of Science in Computer Science",
    duration: "2016 - 2020",
    description:
      "Graduated with honors. Participated in various coding competitions.",
    achievements: [
      "Dean's List all semesters",
      "Won 2nd place in National Coding Competition",
      "Led student web development club",
    ],
    courses: [
      "Data Structures",
      "Database Systems",
      "Web Development",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
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

export default function EducationPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground p-8"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="close-btn"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold text-heading mb-8 mt-12 text-center"
        >
          Education
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {educationData.map((edu) => (
            <motion.div
              key={edu.id}
              className="card"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                <h2 className="text-xl font-medium text-heading">
                  {edu.degree}
                </h2>
                <span className="text-accent text-sm">{edu.duration}</span>
              </div>
              <p className="text-lg text-accent mb-4">
                {edu.institution}
              </p>
              <p className="text-foreground/80 text-sm mb-6">{edu.description}</p>

              <div className="mb-6">
                <h3 className="text-lg text-md text-heading mb-3">
                  Achievements:
                </h3>
                <ul className="list-disc text-sm pl-5 space-y-2 text-foreground/80">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-md font-medium text-heading mb-3">
                  Relevant Courses:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course, index) => (
                    <span
                      key={index}
                      className="text-xs bg-secondary text-foreground/90 px-3 py-1 mb-2 rounded-full"
                    >
                      {course}
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
