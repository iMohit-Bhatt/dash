import { motion } from 'framer-motion'
import { useState } from 'react'

const AnimatedHeadline = () => {
  const [hoveredWord, setHoveredWord] = useState(null)

  const words = [
    { text: "Empower", color: "from-cyan-400 to-blue-500" },
    { text: "Your", color: "from-purple-400 to-pink-500" },
    { text: "Business", color: "from-green-400 to-yellow-500" },
    { text: "with", color: "from-blue-400 to-cyan-500" },
    { text: "Smart", color: "from-pink-400 to-purple-500" },
    { text: "Data", color: "from-yellow-400 to-green-500" },
    { text: "Solutions", color: "from-cyan-400 to-blue-500" }
  ]

  const wordVariants = {
    initial: { 
      letterSpacing: "0em",
      filter: "blur(0px)"
    },
    hover: { 
      letterSpacing: "0.1em",
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const glowVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8
    },
    hover: { 
      opacity: 1,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.h1
      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-white leading-tight"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="relative inline-block mr-4 md:mr-6 lg:mr-8 cursor-pointer"
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
            style={{ zIndex: -1 }}
          />
          
          {/* Text with gradient */}
          <span className={`bg-gradient-to-r ${word.color} bg-clip-text text-transparent`}>
            {word.text}
          </span>
          
          {/* Underline effect */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${word.color} rounded-full`}
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Sparkle effect */}
          {hoveredWord === index && (
            <>
              <motion.div
                className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 rounded-full"
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