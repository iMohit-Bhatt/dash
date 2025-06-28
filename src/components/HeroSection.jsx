import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AmbientBackground from './AmbientBackground'
import DataNetwork from './DataNetwork'
import AnimatedHeadline from './AnimatedHeadline'
import EnhancedCTA from './EnhancedCTA'
import EnhancedScrollIndicator from './EnhancedScrollIndicator'

const HeroSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const ctaY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const networkY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const scrollToDashboard = () => {
    const dashboardSection = document.querySelector('[data-section="dashboard"]')
    if (dashboardSection) {
      // Get the current viewport height
      const viewportHeight = window.innerHeight
      
      // Scroll to position the dashboard section at the top of the viewport
      window.scrollTo({
        top: viewportHeight,
        behavior: 'smooth'
      })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('[data-section="contact"]')
    if (contactSection) {
      const targetPosition = contactSection.offsetTop
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
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

  return (
    <section ref={sectionRef} className="section relative h-screen overflow-hidden" data-section="hero">
      {/* Ambient Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <AmbientBackground />
      </motion.div>

      {/* 3D Data Network with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: networkY }}
      >
        <DataNetwork />
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        className="container mx-auto px-4 text-center relative z-10 h-full flex flex-col justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Headline with Parallax */}
        <motion.div
          className="mb-8"
          style={{ y: headlineY }}
        >
          <AnimatedHeadline />
        </motion.div>

        {/* Subtext with Enhanced Animations */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          From <motion.span 
            className="text-cyan-500 font-semibold"
            whileHover={{ 
              textShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
              scale: 1.05
            }}
            transition={{ duration: 0.3 }}
          >Excel</motion.span> to{' '}
          <motion.span 
            className="text-pink-500 font-semibold"
            whileHover={{ 
              textShadow: "0 0 20px rgba(236, 72, 153, 0.8)",
              scale: 1.05
            }}
            transition={{ duration: 0.3 }}
          >Insights</motion.span> – we{' '}
          <motion.span 
            className="text-yellow-500 font-semibold"
            whileHover={{ 
              textShadow: "0 0 20px rgba(234, 179, 8, 0.8)",
              scale: 1.05
            }}
            transition={{ duration: 0.3 }}
          >automate</motion.span>,{' '}
          <motion.span 
            className="text-green-500 font-semibold"
            whileHover={{ 
              textShadow: "0 0 20px rgba(34, 197, 94, 0.8)",
              scale: 1.05
            }}
            transition={{ duration: 0.3 }}
          >visualize</motion.span>, and{' '}
          <motion.span 
            className="gradient-text font-semibold"
            whileHover={{ 
              textShadow: "0 0 30px rgba(6, 182, 212, 0.8)",
              scale: 1.05
            }}
            transition={{ duration: 0.3 }}
          >simplify</motion.span>.
        </motion.p>

        {/* Enhanced CTA Buttons with Parallax */}
        <motion.div
          style={{ y: ctaY }}
          variants={itemVariants}
        >
          <EnhancedCTA 
            onDashboardClick={scrollToDashboard}
            onContactClick={scrollToContact}
          />
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
        >
          <EnhancedScrollIndicator onClick={scrollToDashboard} />
        </motion.div>
      </motion.div>

      {/* Floating Data Elements with Enhanced Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 text-xs text-white text-opacity-20 font-mono"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div 
              key={i} 
              className="mb-2"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              {Math.random().toString(36).substring(7)}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 text-xs text-white text-opacity-20 font-mono"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div 
              key={i} 
              className="mb-2"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {Math.random().toString(16).substring(2)}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Burst Effect Trigger */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => {
          // Trigger burst effect when section comes into view
          console.log('Hero section burst effect triggered!')
        }}
      />
    </section>
  )
}

export default HeroSection 