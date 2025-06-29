import { motion } from 'framer-motion'
import { useSpring, animated } from 'react-spring'
import { useEffect, useState, useRef } from 'react'

const AmbientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Animated gradient orbs with warm colors
  const orb1 = useSpring({
    from: { x: 0, y: 0 },
    to: async (next) => {
      while (true) {
        await next({ x: Math.random() * 100, y: Math.random() * 100 })
        await new Promise(resolve => setTimeout(resolve, 8000))
      }
    },
    config: { mass: 1, tension: 120, friction: 14 }
  })

  const orb2 = useSpring({
    from: { x: 100, y: 100 },
    to: async (next) => {
      while (true) {
        await next({ x: Math.random() * 100, y: Math.random() * 100 })
        await new Promise(resolve => setTimeout(resolve, 12000))
      }
    },
    config: { mass: 1.5, tension: 100, friction: 20 }
  })

  const orb3 = useSpring({
    from: { x: 50, y: 50 },
    to: async (next) => {
      while (true) {
        await next({ x: Math.random() * 100, y: Math.random() * 100 })
        await new Promise(resolve => setTimeout(resolve, 15000))
      }
    },
    config: { mass: 2, tension: 80, friction: 25 }
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate particles with warm colors
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 2 + 0.5,
    delay: Math.random() * 5,
    color: [
      'bg-green-400/20',
      'bg-green-500/20',
      'bg-green-600/20',
      'bg-green-400/20',
      'bg-green-500/20'
    ][Math.floor(Math.random() * 5)]
  }))

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Animated Gradient Orbs */}
      <animated.div
        className="absolute w-96 h-96 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-full blur-3xl"
        style={{
          left: orb1.x.to(x => `${x}%`),
          top: orb1.y.to(y => `${y}%`),
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <animated.div
        className="absolute w-80 h-80 bg-gradient-to-r from-green-600/25 to-green-700/25 rounded-full blur-3xl"
        style={{
          left: orb2.x.to(x => `${x}%`),
          top: orb2.y.to(y => `${y}%`),
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <animated.div
        className="absolute w-72 h-72 bg-gradient-to-r from-green-700/20 to-green-500/20 rounded-full blur-3xl"
        style={{
          left: orb3.x.to(x => `${x}%`),
          top: orb3.y.to(y => `${y}%`),
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particle.color} rounded-full`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Mouse-following glow effect */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-green-400/10 to-green-500/10 rounded-full blur-2xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(43, 182, 115, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43, 182, 115, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  )
}

export default AmbientBackground 