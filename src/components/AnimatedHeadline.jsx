import { motion } from 'framer-motion'
import { useState } from 'react'

const AnimatedHeadline = () => {
  const [hoveredWord, setHoveredWord] = useState(null)

  const words = [
    { text: "Transform", color: "from-green-500 to-green-400" },
    { text: "Your", color: "from-green-400 to-green-300" },
    { text: "Data", color: "from-green-300 to-green-200" },
    { text: "Into", color: "from-green-200 to-green-100" },
    { text: "Insights", color: "from-green-100 to-green-50" }
  ]

  const wordVariants = {
    initial: { 
      letterSpacing: "0.05em",
      filter: "blur(0px)"
    },
    hover: { 
      letterSpacing: "0.15em",
      filter: "blur(0.5px)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const glowVariants = {
    initial: { 
      scale: 1,
      opacity: 0
    },
    hover: { 
      scale: 1.2,
      opacity: 0.8,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.h1 
      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="relative inline-block mx-2 cursor-pointer"
          variants={wordVariants}
          initial="initial"
          whileHover="hover"
          onHoverStart={() => setHoveredWord(index)}
          onHoverEnd={() => setHoveredWord(null)}
        >
          {/* Glow Effect */}
          <motion.span
            className={`absolute inset-0 bg-gradient-to-r ${word.color} blur-xl opacity-0`}
            variants={glowVariants}
          />
          
          {/* Main Text */}
          <span className={`relative bg-gradient-to-r ${word.color} bg-clip-text text-transparent`}>
            {word.text}
          </span>
          
          {/* Underline Effect */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Sparkle Effect */}
          {hoveredWord === index && (
            <>
              <motion.div
                className="absolute -top-2 -right-2 w-2 h-2 bg-green-400 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-1 h-1 bg-green-300 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </>
          )}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default AnimatedHeadline 