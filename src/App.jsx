import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import DashboardDemo from './components/DashboardDemo'
import ServicesSection from './components/ServicesSection'
import TestimonialsSection from './components/TestimonialsSection'
import WhyUsSection from './components/WhyUsSection'
import ContactSection from './components/ContactSection'
import FloatingCTA from './components/FloatingCTA'

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
    
    // Smooth scroll animations
    gsap.utils.toArray('.section').forEach((section, i) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [hasInitialized])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-data-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 bg-opacity-20 rounded-full blur-3xl floating"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 bg-opacity-20 rounded-full blur-3xl floating-delay-1"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 bg-opacity-20 rounded-full blur-3xl floating-delay-2"></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-cyan-500 bg-opacity-20 rounded-full blur-3xl floating-delay-3"></div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <DashboardDemo />
        <ServicesSection />
        <TestimonialsSection />
        <WhyUsSection />
        <ContactSection />
      </div>

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}

export default App
