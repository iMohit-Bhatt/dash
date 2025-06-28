import { motion } from 'framer-motion'
import { useSpring, animated } from 'react-spring'
import { useEffect, useState } from 'react'

const AmbientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animated gradient blobs
  const blob1 = useSpring({
    from: { x: 0, y: 0 },
    to: async (next) => {
      while (true) {
        await next({ x: 100, y: 50 })
        await next({ x: 0, y: 0 })
      }
    },
    config: { duration: 8000 }
  })

  const blob2 = useSpring({
    from: { x: 0, y: 0 },
    to: async (next) => {
      while (true) {
        await next({ x: -80, y: -30 })
        await next({ x: 0, y: 0 })
      }
    },
    config: { duration: 12000 }
  })

  const blob3 = useSpring({
    from: { x: 0, y: 0 },
    to: async (next) => {
      while (true) {
        await next({ x: 60, y: -60 })
        await next({ x: 0, y: 0 })
      }
    },
    config: { duration: 10000 }
  })

  // Matrix-style characters
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  const matrixColumns = 20
  const matrixRows = 15

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Blobs */}
      <animated.div
        style={{
          transform: blob1.x.to(x => `translate(${x}px, ${blob1.y.get()}px)`)
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl mix-blend-multiply"
      />
      
      <animated.div
        style={{
          transform: blob2.x.to(x => `translate(${x}px, ${blob2.y.get()}px)`)
        }}
        className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl mix-blend-multiply"
      />
      
      <animated.div
        style={{
          transform: blob3.x.to(x => `translate(${x}px, ${blob3.y.get()}px)`)
        }}
        className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-green-500/30 to-yellow-500/30 rounded-full blur-3xl mix-blend-multiply"
      />

      {/* Matrix-style Data Stream */}
      <div className="absolute inset-0">
        {Array.from({ length: matrixColumns }, (_, colIndex) => (
          <motion.div
            key={colIndex}
            className="absolute top-0 text-xs text-cyan-500/20 font-mono"
            style={{
              left: `${(colIndex / matrixColumns) * 100}%`,
              animationDelay: `${colIndex * 0.1}s`
            }}
            animate={{
              y: [0, window.innerHeight + 100]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: matrixRows }, (_, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="mb-2"
                animate={{
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: rowIndex * 0.1 + colIndex * 0.05
                }}
              >
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Floating Data Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* 3D Light Scan Wave */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Interactive Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="cyan" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Parallax Depth Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-2xl" />
      </motion.div>
    </div>
  )
}

export default AmbientBackground 