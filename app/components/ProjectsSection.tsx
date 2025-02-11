'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface Project {
  id: number
  name: string
  categories: string[]
  images: string[]
  description: string
}

const projects: Project[] = [
  // {
  //   id: 1,
  //   name: 'Enhanced Expense Tracker',
  //   categories: ['Python', 'Data Visualization', 'GUI Development', 'Data Management', 'Data Analysis'],
  //   images: [
  //     '/images/expense-tracker/expense-tracker-budget.png',
  //     '/images/expense-tracker/expense-tracker-add-expense.png',
  //     '/images/expense-tracker/expense-tracker-add-expense-filled.png',
  //     '/images/expense-tracker/expense-tracker-summary.png',
  //     '/images/expense-tracker/expense-tracker-export.png'
  //   ],
  //   description: 'A personal finance tracker with GUI using Tkinter, visualizing spending trends through Matplotlib, and handling data storage with Pandas and CSV.'
  // },
  // {
  //   id: 2,
  //   name: 'Binary-Decimal Converter',
  //   categories: ['Python', 'GUI Development'],
  //   images: [
  //     '/images/binary-to-decimal/binary-converter.png'
  //   ],
  //   description: 'A converter using Python\'s Tkinter for seamless conversion between binary and decimal formats, with input validation and a user-friendly interface.'
  // },
  // {
  //   id: 3,
  //   name: 'Furniture Layout Optimization (SLC)',
  //   categories: ['Project Management', 'Documentation'],
  //   images: [
  //     '/images/furniture-layout/furniture-layout-1.png',
  //     '/images/furniture-layout/furniture-layout-2.png',
  //     '/images/furniture-layout/furniture-layout-3.png',
  //     '/images/furniture-layout/furniture-layout-4.png',
  //   ],
  //   description: 'Created a standardized manual using Microsoft Word and Canva, aiding staff orientation and optimizing space utilization at the SLC.'
  // }
]

const categories = ['All', 'Python', 'Full-Stack', 'GUI Development', 'Backend Development', 'Frontend']

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.categories.includes(filter))

  const openModal = useCallback((project: Project, index: number) => {
    setCurrentProject(project)
    setCurrentImageIndex(index)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setCurrentProject(null)
    setCurrentImageIndex(0)
  }, [])

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
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  return (
    <motion.section 
      ref={ref} 
      id="projects" 
      className="py-12 sm:py-20"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Projects</h2>
          <motion.div 
            className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-orange-500 text-black'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {project.images.map((image, index) => (
                    <SwiperSlide key={index} onClick={() => openModal(project, index)}>
                      <Image
                        src={image}
                        alt={`${project.name} - Image ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-48 sm:h-56 object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev !text-orange-500 !w-8 !h-8 !left-2">
                  <ChevronLeft size={24} />
                </div>
                <div className="swiper-button-next !text-orange-500 !w-8 !h-8 !right-2">
                  <ChevronRight size={24} />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((cat) => (
                    <span key={cat} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpen && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-gray-900 p-4 rounded-2xl max-w-4xl w-full relative"
            >
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-2 right-2 text-white hover:text-orange-500 transition-colors z-10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <Swiper
                initialSlide={currentImageIndex}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="h-[50vh] sm:h-[60vh]"
              >
                {currentProject.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex items-center justify-center h-full">
                      <Image
                        src={image}
                        alt={`${currentProject.name} - Image ${index + 1}`}
                        width={800}
                        height={600}
                        className="max-h-full w-auto object-contain rounded-xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

