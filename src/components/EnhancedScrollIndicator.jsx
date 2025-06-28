import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EnhancedScrollIndicator = ({ onClick }) => {
  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0, 0.5, 0],
      scale: [0.8, 1.5, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
      variants={floatVariants}
      initial="initial"
      animate="animate"
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Pulsing Background */}
      <motion.div
        className="absolute inset-0 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Icon */}
      <motion.div
        className="relative z-10 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ 
          boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
          transition: { duration: 0.3 }
        }}
      >
        <ChevronDown className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </motion.div>
      
      {/* Animated Rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-cyan-500 border-opacity-30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        Scroll to explore
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black border-t-opacity-80"></div>
      </motion.div>
    </motion.div>
  )
}

export default EnhancedScrollIndicator 