import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import DashboardShowcase from './components/DashboardShowcase'
import TrustedBySection from './components/TrustedBySection'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [hasInitialized, setHasInitialized] = useState(false)

  // Ensure page starts at the top only on initial load
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0)
    
    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Set a flag to prevent further interference after initial load
    const timer = setTimeout(() => {
      setHasInitialized(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  useGSAP(() => {
    // Only ensure we start at the top if we haven't initialized yet
    if (!hasInitialized) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
    }
    
    // Smooth scroll animations with better performance
    gsap.utils.toArray('.section').forEach((section, i) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      )
    })

    // Smooth parallax effect for background elements
    gsap.to('.floating', {
      y: -30,
      duration: 6,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

    gsap.to('.floating-delay-1', {
      y: -20,
      duration: 8,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    })

    gsap.to('.floating-delay-2', {
      y: -25,
      duration: 7,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2
    })

    gsap.to('.floating-delay-3', {
      y: -15,
      duration: 9,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    })
  }, [hasInitialized])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      {/* Logo at the top-left with more space and larger size */}
      <img src="/logo.png" alt="Logo" className="absolute top-8 left-8 max-h-20 w-auto z-30" style={{ maxWidth: '200px' }} />
      {/* Faux Navbar at the top-right */}
      <div className="absolute top-10 right-12 flex gap-8 z-30">
        <span className="text-white text-lg font-medium hover:underline cursor-pointer transition">How we help</span>
        <span className="text-white text-lg font-medium hover:underline cursor-pointer transition">Why choose us</span>
        <span className="text-white text-lg font-medium hover:underline cursor-pointer transition">What client say</span>
      </div>
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-data-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 bg-opacity-20 rounded-full blur-3xl floating"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-green-400 bg-opacity-20 rounded-full blur-3xl floating-delay-1"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-300 bg-opacity-20 rounded-full blur-3xl floating-delay-2"></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-green-200 bg-opacity-20 rounded-full blur-3xl floating-delay-3"></div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <DashboardShowcase />
        <TrustedBySection />
      </div>
    </div>
  )
}

export default App
