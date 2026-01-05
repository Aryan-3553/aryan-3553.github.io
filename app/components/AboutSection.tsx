'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

type IconType = string | React.ComponentType<{ className?: string }>;

interface Skill {
  icon: IconType;
  label: string;
  percentage: number;
}

const CircularProgress = React.memo(({ percentage, icon, label, inView }: { 
  percentage: number;
  icon: IconType;
  label: string;
  inView: boolean;
}) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90 transform">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-800"
          />
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-orange-500"
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : { strokeDashoffset: circumference }}
            transition={{ duration: 2, ease: "easeInOut" }}
            strokeDasharray={circumference}
          />
        </svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-gray-300"
          initial={{ opacity: 0, rotate: -90 }}
          animate={inView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -90 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {typeof icon === 'string' ? (
            <Image src={icon} alt={label} width={32} height={32} className="w-8 h-8" />
          ) : (
            React.createElement(icon, { className: "w-8 h-8" })
          )}
        </motion.div>
      </div>
      <motion.div 
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="text-2xl font-bold text-orange-500">{percentage}%</div>
        <div className="text-sm text-gray-400 mt-1">{label}</div>
      </motion.div>
    </motion.div>
  );
});

CircularProgress.displayName = 'CircularProgress';

const skills: Skill[] = [
  { 
    icon: "/icons/C-sharp-icon.svg",
    label: 'Python',
    percentage: 90
  },
  {
    icon: "/icons/C-sharp-icon.svg",
    label: 'React',
    percentage: 90
  },
  {
    icon: "/icons/C-sharp-icon.svg",
    label: 'C++',
    percentage: 85
  },
  {
    icon: "/icons/C-sharp-icon.svg",
    label: 'C#',
    percentage: 80
  },
  {
    icon: "/icons/C-sharp-icon.svg",
    label: 'TypeScript',
    percentage: 85
  }
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.section 
      ref={sectionRef}
      id="about" 
      className="py-20"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      style={{ opacity, scale }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="max-w-4xl mx-auto text-center mb-16" variants={itemVariants}>
          <motion.h2 
            className="text-4xl font-bold text-white mb-6" 
            variants={itemVariants}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-orange-500 mx-auto mb-8" 
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
          <motion.p 
            className="text-lg text-gray-300 mb-6" 
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Passionate senior Computer Science student specializing in Artificial Intelligence at the University of Waterloo , with a strong foundation in software development (mobile applications and full-stack web) and a keen enthusiasm for AI, ML, and computer vision . My unique blend of technical expertise and innovative thinking allows me to create impactful software solutions that bridge technology and user experience.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto px-4"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.label}
              className="flex flex-col items-center bg-black/20 rounded-lg p-6"
              variants={itemVariants}
              custom={index}
            >
              <CircularProgress
                percentage={skill.percentage}
                icon={skill.icon}
                label={skill.label}
                inView={isInView}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

