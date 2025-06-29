import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Play, Sparkles, Phone, BarChart3 } from 'lucide-react'

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
        className="absolute w-1 h-1 bg-green-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.1
        }}
      />
    ))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
      {/* Get Free Consultation Button */}
      <motion.button
        className="relative group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setHoveredButton('contact')}
        onHoverEnd={() => setHoveredButton(null)}
        onClick={onContactClick}
      >
        {/* Animated Borders */}
        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-green-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-green-600 rounded-full"
          animate={{ rotate: 180 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Sparkles */}
        {hoveredButton === 'contact' && generateSparkles()}

        {/* Content */}
        <motion.span 
          className="relative z-10 flex items-center gap-2"
          animate={{ x: hoveredButton === 'contact' ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Phone className="w-5 h-5" />
          Get Free Consultation
        </motion.span>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-0 blur-xl"
          animate={{
            opacity: hoveredButton === 'contact' ? 0.3 : 0,
            scale: hoveredButton === 'contact' ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* View Dashboard Demo Button */}
      <motion.button
        className="relative group px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setHoveredButton('dashboard')}
        onHoverEnd={() => setHoveredButton(null)}
        onClick={onDashboardClick}
      >
        {/* Animated Borders */}
        <motion.div
          className="absolute inset-0 border-2 border-green-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-green-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-green-700 rounded-full"
          animate={{ rotate: 180 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Sparkles */}
        {hoveredButton === 'dashboard' && generateSparkles()}

        {/* Content */}
        <motion.span 
          className="relative z-10 flex items-center gap-2"
          animate={{ rotate: hoveredButton === 'dashboard' ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <BarChart3 className="w-5 h-5" />
          View Dashboard Demo
        </motion.span>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-0 blur-xl"
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