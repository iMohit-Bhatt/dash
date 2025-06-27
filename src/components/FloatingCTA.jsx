import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, X, Phone, Mail } from 'lucide-react'

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      style={{ opacity }}
    >
      {/* Main CTA Button */}
      <motion.button
        className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-primary-500/25 transition-shadow duration-300"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: isExpanded ? 0.9 : 1,
          rotate: isExpanded ? 45 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      {/* Expanded Options */}
      <motion.div
        className="absolute bottom-20 right-0 space-y-3"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          scale: isExpanded ? 1 : 0.8,
          y: isExpanded ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
      >
        {/* Phone Option */}
        <motion.a
          href="tel:+15551234567"
          className="w-14 h-14 bg-gradient-to-r from-neon-green to-accent-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-neon-green/25 transition-all duration-300 group"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.a>

        {/* Email Option */}
        <motion.a
          href="mailto:hello@datasolutions.com"
          className="w-14 h-14 bg-gradient-to-r from-neon-cyan to-primary-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-neon-cyan/25 transition-all duration-300 group"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.a>

        {/* Consultation Option */}
        <motion.button
          className="w-14 h-14 bg-gradient-to-r from-neon-pink to-secondary-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-neon-pink/25 transition-all duration-300 group"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={() => {
            // Scroll to contact section
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            setIsExpanded(false)
          }}
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-0 right-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap"
        initial={{ opacity: 0, x: 10 }}
        animate={{
          opacity: isExpanded ? 0 : 1,
          x: isExpanded ? 10 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        Let's Talk! 💬
        <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-white/20 rotate-45"></div>
      </motion.div>

      {/* Background Overlay */}
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
        />
      )}
    </motion.div>
  )
}

export default FloatingCTA 