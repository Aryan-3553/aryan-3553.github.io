'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react'

interface Experience {
  title: string
  company: string
  location: string
  date: string
  description: string[]
  color: string
}

const experiences: Experience[] = [
  {
    title: "Software Engineer Intern",
    company: "BTNX",
    location: "Toronto, ON",
    date: "Sep 2024 - Dec 2024",
    description: [
      "Revamped the functionality and UI of the RapidReader App for 150k+ iOS/Android users using the .NET MAUI framework, resulting in a massive increase in user engagement (based on Google app usage analytics).",
      "Redesigned a large-scale management website (20+ databases) using TypeScript, React, C#, and SQL, driving improvement in data retrieval speed (verified by performance and load-testing benchmarks).",
      "Developed Python scripts to automate testing of PyTorch-based deep learning models, achieving 97% strip reader accuracy (measured by comprehensive test suite logs)."
    ],
    color: "#FF6B6B"
  },
  {
    title: "Software Engineer Intern",
    company: "University of Waterloo",
    location: "Waterloo, ON",
    date: "Jan 2024 - Apr 2024",
    description: [
      "Developed code and executed comprehensive test cases (including automated testing) leveraging Codeception within the Drupal (PHP) environment.",
      "Spearheaded the adoption of API automation testing, increasing test coverage by 25% and identifying critical backend issues, ensuring the quality and functionality of WCMS3 project features.",
      "Refactored and combined multiple Python API endpoints, speeding up the WCMS search system by 20%.",
      "Identified, documented, and reported bugs and issues in backend of Waterloo's Content Management System, contributing to enhanced system efficiency."
    ],
    color: "#4ECDC4"
  },
  {
    title: "Full Stack Software Engineer Intern",
    company: "INTECH",
    location: "Orlando, FL",
    date: "May 2022 - Aug 2022",
    description: [
      "Worked closely with senior UI developers and leveraged React (React Router, Styled Components, and Axios) to implement robust front-end functionality for their e-commerce platform.",
      "Containerized the website on AWS EC2 with Docker, boosting scalability & cutting deployment time by 6 mins.",
      "Built and tested a live HTML-to-PDF API with Python and Postman, generating real-time reports for users."
    ],
    color: "#FFD93D"
  }
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    }
  }
}

export default function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 })

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      className="py-20 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Experience</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300">
            Milestones in My Professional Journey
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="mb-8 relative"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              ></motion.div>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: `0 8px 12px -1px ${exp.color}30, 0 4px 8px -1px ${exp.color}20` }}
                className="ml-6 bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition-all duration-300"
                style={{
                  boxShadow: `0 4px 6px -1px ${exp.color}20, 0 2px 4px -1px ${exp.color}10`
                }}
              >
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-white flex items-center">
                    <Briefcase className="w-6 h-6 mr-2 text-orange-500" />
                    {exp.title}
                  </h3>
                  <span className="text-orange-500 font-medium">{exp.company}</span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{exp.location}</span>
                  <Calendar className="w-4 h-4 ml-4 mr-2" />
                  <span>{exp.date}</span>
                </div>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="list-disc list-inside text-gray-300 mt-4"
                    >
                      {exp.description.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="mb-2"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <motion.button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="mt-4 text-orange-500 hover:text-orange-400 transition-colors duration-200 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedIndex === index ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show Details
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

