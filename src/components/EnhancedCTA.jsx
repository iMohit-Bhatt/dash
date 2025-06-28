import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const EnhancedCTA = ({ onDashboardClick, onContactClick }) => {
  const [hoveredButton, setHoveredButton] = useState(null)

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    jiggle: {
      rotate: [-2, 2, -2, 2, 0],
      transition: { duration: 0.5 }
    }
  }

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  const ringVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1.2, 
      opacity: 0,
      transition: { 
        duration: 1,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  }

  const generateSparkles = (count = 3) => {
    return Array.from({ length: count }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-amber-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: i * 0.1 }}
      />
    ))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
      {/* Get Free Consultation Button */}
      <motion.button
        className="relative group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHoveredButton('contact')}
        onHoverEnd={() => setHoveredButton(null)}
        onClick={onContactClick}
      >
        {/* Animated Rings */}
        <motion.div
          className="absolute inset-0 border-2 border-amber-400 rounded-full"
          variants={ringVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute inset-0 border-2 border-orange-400 rounded-full"
          variants={ringVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-red-400 rounded-full"
          variants={ringVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        />

        {/* Sparkles */}
        {hoveredButton === 'contact' && generateSparkles()}

        {/* Button Content */}
        <div className="relative z-10 flex items-center gap-2">
          <span>Get Free Consultation</span>
          <motion.div
            animate={{ x: hoveredButton === 'contact' ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-0 blur-xl"
          animate={{ 
            opacity: hoveredButton === 'contact' ? 0.3 : 0,
            scale: hoveredButton === 'contact' ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* View Dashboard Demo Button */}
      <motion.button
        className="relative group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHoveredButton('dashboard')}
        onHoverEnd={() => setHoveredButton(null)}
        onClick={onDashboardClick}
      >
        {/* Animated Rings */}
        <motion.div
          className="absolute inset-0 border-2 border-orange-400 rounded-full"
          variants={ringVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute inset-0 border-2 border-red-400 rounded-full"
          variants={ringVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-amber-400 rounded-full"
          variants={ringVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        />

        {/* Sparkles */}
        {hoveredButton === 'dashboard' && generateSparkles()}

        {/* Button Content */}
        <div className="relative z-10 flex items-center gap-2">
          <motion.div
            animate={{ rotate: hoveredButton === 'dashboard' ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Play className="w-4 h-4" />
          </motion.div>
          <span>View Dashboard Demo</span>
        </div>

        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-0 blur-xl"
          animate={{ 
            opacity: hoveredButton === 'dashboard' ? 0.3 : 0,
            scale: hoveredButton === 'dashboard' ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  )
}

export default EnhancedCTA 