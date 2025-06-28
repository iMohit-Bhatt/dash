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
        className="absolute inset-0 border-2 border-amber-400 rounded-full"
        variants={ringVariants}
        animate="animate"
      />
      <motion.div
        className="absolute inset-0 border-2 border-orange-400 rounded-full"
        variants={ringVariants}
        animate="animate"
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-red-400 rounded-full"
        variants={ringVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />

      {/* Main Button */}
      <motion.div
        className="relative w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-amber-400/30"
        variants={pulseVariants}
        animate="animate"
        whileHover={{
          boxShadow: "0 0 30px rgba(251, 191, 36, 0.5)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-xl"
          variants={glowVariants}
          animate="animate"
        />

        {/* Icon */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="relative z-10"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>

        {/* Sparkles */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-amber-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-1 h-1 bg-orange-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-md text-white text-sm rounded-lg shadow-lg border border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        <span className="whitespace-nowrap">Scroll to explore</span>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-500/90"></div>
      </motion.div>
    </motion.div>
  )
}

export default EnhancedScrollIndicator 