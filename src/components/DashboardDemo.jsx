import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Target, X } from 'lucide-react'
import Lottie from 'lottie-react'
import LottieBackground from './LottieBackground'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DashboardDemo = () => {
  const sectionRef = useRef(null)
  const servicesRef = useRef(null)
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const services = [
    {
      animationPath: "/01 Integration.json",
      title: "Data Integration",
      description: "Ensuring complete, accurate, and timely data, we integrate and consolidate your business' data sources into a cohesive model, from a few spreadsheets to millions of rows of data.",
      color: "from-green-500 to-green-400"
    },
    {
      animationPath: "/03 Alignment.json",
      title: "Data Analysis & Alignment",
      description: "Executing deep data analysis, we turn raw data into valuable business insights, helping you align your data with your goals and initiatives for maximum ROI.",
      color: "from-green-400 to-green-300"
    },
    {
      animationPath: "/02 Visualization.json",
      title: "Data Visualization",
      description: "We turn static spreadsheets and confusing dashboards into vivid, clear data visualizations that help you better use and understand your data.",
      color: "from-green-300 to-green-200"
    }
  ]

  // GSAP Scroll Animations for Services
  useEffect(() => {
    if (servicesRef.current) {
      const serviceCards = servicesRef.current.querySelectorAll('.service-card')
      
      // Stagger animation for service cards
      gsap.fromTo(serviceCards, 
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: -15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Parallax effect for the Lottie animations inside cards
      serviceCards.forEach((card, index) => {
        const lottieContainer = card.querySelector('.lottie-container')
        if (lottieContainer) {
          gsap.to(lottieContainer, {
            y: -30,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          })
        }
      })

      // Floating animation for cards on hover
      serviceCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -20,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          })
        })
      })
    }

    // GSAP Scroll Animations for Header Section
    const headerSection = sectionRef.current?.querySelector('.header-section')
    if (headerSection) {
      // Badge animation
      const badge = headerSection.querySelector('.header-badge')
      if (badge) {
        gsap.fromTo(badge,
          {
            y: -50,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headerSection,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Main title animation
      const title = headerSection.querySelector('.header-title')
      if (title) {
        gsap.fromTo(title,
          {
            y: 60,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: headerSection,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Description animation
      const description = headerSection.querySelector('.header-description')
      if (description) {
        gsap.fromTo(description,
          {
            y: 40,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: headerSection,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Floating animation for the entire header
      gsap.to(headerSection, {
        y: -20,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerSection,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Custom Lottie component for service icons
  const ServiceLottie = ({ animationPath }) => {
    const [animationData, setAnimationData] = useState(null)
    const lottieRef = useRef(null)

    useEffect(() => {
      fetch(animationPath)
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch(error => console.error('Error loading Lottie animation:', error))
    }, [animationPath])

    useEffect(() => {
      if (lottieRef.current && animationData) {
        lottieRef.current.setSpeed(1)
        lottieRef.current.play()
      }
    }, [animationData])

    if (!animationData) {
      return <div className="w-full h-full bg-green-400/20 rounded-lg animate-pulse" />
    }

    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    )
  }

  // Custom Lottie component for modal background
  const ModalLottieBackground = () => {
    const [animationData, setAnimationData] = useState(null)
    const lottieRef = useRef(null)

    useEffect(() => {
      fetch("/Header BG ex Json.json")
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch(error => console.error('Error loading modal background animation:', error))
    }, [])

    useEffect(() => {
      if (lottieRef.current && animationData) {
        lottieRef.current.setSpeed(0.5)
        lottieRef.current.play()
      }
    }, [animationData])

    if (!animationData) {
      return null
    }

    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    )
  }

  const handleCardClick = (service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={sectionRef} className="relative pt-16 pb-16 overflow-hidden bg-[#002825]" data-section="dashboard">
      {/* Lottie Background */}
      <LottieBackground 
        animationPath="/Header BG ex Json.json"
        className="opacity-50"
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="header-section text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="header-badge inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm font-medium tracking-wide">Trusted by + Clients</span>
            </div>
          </motion.div>

          <motion.h2 
            className="header-title text-4xl md:text-6xl font-display font-bold mb-8 gradient-text-warm"
            variants={itemVariants}
          >
            We make your data clear and useful, and your decisions data-driven.
          </motion.h2>

          <motion.p 
            className="header-description text-xl text-gray-50 mb-12 max-w-3xl mx-auto leading-relaxed font-body"
            variants={itemVariants}
          >
            Partner with former <span className="text-green-400 font-semibold">BCG, McKinsey, and Bain</span> Analytics Consultants.
          </motion.p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          ref={servicesRef}
          className="grid md:grid-cols-3 gap-12 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card card-premium group cursor-pointer p-8"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onClick={() => handleCardClick(service)}
            >
              <motion.div
                className="lottie-container w-96 h-96 mx-auto mb-8 glass-warm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 0 30px rgba(43, 182, 115, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <ServiceLottie animationPath={service.animationPath} />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-green-200 transition-colors duration-300 text-center">
                {service.title}
              </h3>

              {/* Hover Sparkles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-gradient-to-br from-[#001a17] to-[#00332e] border border-green-800/50 rounded-3xl p-10 max-w-5xl w-full relative shadow-2xl shadow-green-900/20 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(34, 197, 94, 0.1)'
            }}
          >
            {/* Modal Background Animation */}
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <ModalLottieBackground />
            </div>

            {/* Close Button */}
            <motion.button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 bg-green-900/30 hover:bg-green-800/50 rounded-full flex items-center justify-center text-green-300 hover:text-white transition-all duration-300 group z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </motion.button>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              {/* Left Side - Animation */}
              <div className="flex-shrink-0">
                <motion.div 
                  className="w-72 h-72 glass-warm rounded-3xl flex items-center justify-center relative overflow-hidden border border-green-700/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <ServiceLottie animationPath={selectedService.animationPath} />
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-3xl pointer-events-none" />
                </motion.div>
              </div>
              
              {/* Right Side - Text Content */}
              <div className="flex-1 text-left space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
                    {selectedService.title}
                  </h3>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full mb-6" />
                </motion.div>
                
                <motion.p 
                  className="text-green-50 leading-relaxed font-body text-lg mb-8 opacity-90"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {selectedService.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.button
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Get Started
                      <motion.div
                        className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </span>
                    
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default DashboardDemo 