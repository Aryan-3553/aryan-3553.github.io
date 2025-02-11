'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Linkedin, Github, Mail } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About me', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact me', href: '#contact' },
]

const socialLinks = [
  // { icon: Instagram, href: 'https://www.instagram.com/aryan__4123/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aryan-patel-036688202/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Aryan-3553', label: 'Github' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 50,
      damping: 10,
      duration: 0.8,
    },
  },
}

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
}

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.footer
      ref={ref}
      className="py-12"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={logoVariants} className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white inline-block">
            <motion.span
              className="inline-block"
              whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
            >
              AP
            </motion.span>
          </Link>
        </motion.div>

        <motion.nav variants={itemVariants} className="mb-8">
          <ul className="flex flex-wrap justify-center gap-8">
            {navItems.map((item) => (
              <motion.li key={item.name} whileHover={{ scale: 1.1 }}>
                <Link
                  href={item.href}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
              aria-label={social.label}
              whileHover={{ scale: 1.2, rotate: 15 }}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center space-y-4 mb-8">
          <motion.a
            href="mailto:k38arora@uwaterloo.ca"
            className="flex items-center justify-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-5 h-5" />
            <span>a68patel@uwaterloo.ca</span>
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-gray-500"
        >
          <p>© {new Date().getFullYear()} Aryan Patel. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

