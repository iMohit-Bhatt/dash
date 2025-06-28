import { motion } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, BarChart3 } from 'lucide-react'

const EnhancedCTA = ({ onDashboardClick, onContactClick }) => {
  const [hoveredButton, setHoveredButton] = useState(null)

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 },
    jiggle: {
      rotate: [-1, 1, -1, 1, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }

  const ringVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: [0.8, 1.2, 0.8],
      opacity: [0, 0.5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const generateSparkles = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: i * 0.1 }}
      />
    ))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
      {/* Get Free Consultation Button */}
      <motion.button
        className="relative btn-primary flex items-center gap-3 group overflow-hidden"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHoveredButton('contact')}
        onHoverEnd={() => setHoveredButton(null)}
        onClick={onContactClick}
      >
        {/* Animated Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white border-opacity-30"
          variants={ringVariants}
          initial="initial"
          animate={hoveredButton === 'contact' ? "animate" : "initial"}
        />
        
        {/* Sparkles */}
        {hoveredButton === 'contact' && (
          <div className="absolute inset-0 pointer-events-none">
            {generateSparkles()}
          </div>
        )}

        {/* Button Content */}
        <motion.div
          animate={hoveredButton === 'contact' ? "jiggle" : "initial"}
          variants={buttonVariants}
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.div>
        <span>💬 Get Free Consultation</span>
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* View Dashboard Demo Button */}
      <motion.button
        className="relative btn-secondary flex items-center gap-3 group overflow-hidden"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHoveredButton('dashboard')}
        onHoverEnd={() => setHoveredButton(null)}
        onClick={onDashboardClick}
      >
        {/* Animated Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white border-opacity-30"
          variants={ringVariants}
          initial="initial"
          animate={hoveredButton === 'dashboard' ? "animate" : "initial"}
        />
        
        {/* Sparkles */}
        {hoveredButton === 'dashboard' && (
          <div className="absolute inset-0 pointer-events-none">
            {generateSparkles()}
          </div>
        )}

        {/* Button Content */}
        <motion.div
          animate={hoveredButton === 'dashboard' ? "jiggle" : "initial"}
          variants={buttonVariants}
        >
          <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.div>
        <span>📊 View Dashboard Demo</span>
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  )
}

export default EnhancedCTA 