import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EnhancedScrollIndicator = ({ onClick }) => {
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const ringVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className="relative cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Animated Rings */}
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

      {/* Main Button */}
      <motion.div
        className="relative w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-green-400/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Arrow Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            y: [0, 5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>

        {/* Sparkle Effects */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-green-300 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-1 h-1 bg-green-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-gradient-to-r from-green-500/90 to-green-600/90 backdrop-blur-md text-white text-sm rounded-lg shadow-lg border border-green-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        Scroll to explore
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-green-500/90"></div>
      </motion.div>
    </motion.div>
  )
}

export default EnhancedScrollIndicator 