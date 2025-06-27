import { motion } from 'framer-motion'
import { MessageCircle, BarChart3, ChevronDown } from 'lucide-react'

const HeroSection = () => {
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  }

  const scrollToDashboard = () => {
    const dashboardSection = document.querySelector('[data-section="dashboard"]')
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('[data-section="contact"]')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="section relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-yellow-500 rounded-full"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-white"
          variants={itemVariants}
        >
          <span className="gradient-text">Empower Your Business</span>
          <br />
          <span className="text-white">with Smart Data Solutions</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          From <span className="text-cyan-500 font-semibold">Excel</span> to{' '}
          <span className="text-pink-500 font-semibold">Insights</span> – we{' '}
          <span className="text-yellow-500 font-semibold">automate</span>,{' '}
          <span className="text-green-500 font-semibold">visualize</span>, and{' '}
          <span className="gradient-text font-semibold">simplify</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          variants={itemVariants}
        >
          <motion.button
            className="btn-primary flex items-center gap-3 group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToContact}
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            💬 Get Free Consultation
          </motion.button>

          <motion.button
            className="btn-secondary flex items-center gap-3 group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToDashboard}
          >
            <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            📊 View Dashboard Demo
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={scrollToDashboard}
        >
          <ChevronDown className="w-6 h-6 text-white text-opacity-60 hover:text-white transition-colors" />
        </motion.div>
      </motion.div>

      {/* Floating Data Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 text-xs text-white text-opacity-20 font-mono"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="mb-2">
              {Math.random().toString(36).substring(7)}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 text-xs text-white text-opacity-20 font-mono"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="mb-2">
              {Math.random().toString(16).substring(2)}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection 