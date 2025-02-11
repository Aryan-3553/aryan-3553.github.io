'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Code, PenTool, LineChart, Layers, Zap } from 'lucide-react'

const services = [
  { icon: Smartphone, title: 'App Development', description: 'Creating intuitive and efficient mobile applications tailored to your needs.' },
  { icon: Code, title: 'Web Development', description: 'Building responsive and dynamic websites using cutting-edge technologies.' },
  { icon: PenTool, title: 'UI/UX Design', description: 'Crafting user-centered designs that enhance user experience and engagement.' },
  { icon: LineChart, title: 'Data Analysis', description: 'Extracting meaningful insights from complex datasets to drive informed decisions.' },
  { icon: Layers, title: 'Database Management', description: 'Designing and optimizing database structures for efficient data storage and retrieval.' },
  { icon: Zap, title: 'Performance Optimization', description: 'Enhancing the speed and efficiency of your applications and systems.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-center text-white mb-4"
            variants={itemVariants}
          >
            Skills
          </motion.h2>
          <motion.p 
            className="text-xl text-center text-gray-300 mb-12"
            variants={itemVariants}
          >
            Empowering your digital journey with cutting-edge solutions
          </motion.p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-40 transition-all duration-300 border border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <service.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-orange-500 mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

