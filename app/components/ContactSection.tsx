'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'

export default function ContactSection() {
const ref = useRef(null)
const isInView = useInView(ref, { once: true, amount: 0.3 })

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      duration: 0.8,
    },
  },
}

const underlineVariants = {
  hidden: { width: 0 },
  visible: { 
    width: '80px',
    transition: {
      duration: 1,
      ease: "easeInOut",
    }
  },
}

return (
  <motion.section 
    ref={ref}
    id="contact" 
    className="py-20"
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={containerVariants}
  >
    <div className="container mx-auto px-4">
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-orange-500 mx-auto mb-8"
            variants={underlineVariants}
          ></motion.div>
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cultivating Connections: Reach Out And Connect With Me
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          >
            <Mail className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Email</h3>
            <a
              href="mailto:a68patel@uwaterloo.ca"
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              a68patel@uwaterloo.ca
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          >
            <Linkedin className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/aryan-patel-036688202/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              linkedin.com/in/aryan
            </a>
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 mt-12"
        >
          I&apos;m always open to new opportunities and collaborations. 
          Feel free to reach out through email or connect with me on LinkedIn!
        </motion.p>
      </motion.div>
    </div>
  </motion.section>
)
}

