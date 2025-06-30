import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { 
  BarChart3, 
  PieChart, 
  Database, 
  Activity,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Star
} from 'lucide-react'
import LottieBackground from './LottieBackground'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const cardsRowRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const [x, setX] = useState(0)

  // Horizontal scroll effect: map vertical scroll to horizontal translation
  // Each card is 80vw wide (responsive), with a gap
  const CARD_WIDTH = 340 // px, adjust as needed for your design
  const CARD_GAP = 32 // px
  const NUM_CARDS = 4
  const TOTAL_WIDTH = NUM_CARDS * CARD_WIDTH + (NUM_CARDS - 1) * CARD_GAP
  // The scroll progress will go from 0 to 1 as the section is scrolled
  // We'll map this to translateX from (NUM_CARDS-1)*CARD_WIDTH right to 0
  const smoothX = useSpring(x, { stiffness: 120, damping: 20 })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const services = [
    {
      icon: BarChart3,
      title: "Excel Dashboards",
      description: "Transform your Excel spreadsheets into interactive, real-time dashboards with advanced visualizations and automated updates.",
      features: ["Dynamic charts", "Real-time data", "Custom filters", "Mobile responsive"],
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      glowColor: "rgba(6, 182, 212, 0.3)",
      gradient: "from-cyan-500/20 via-blue-500/10 to-cyan-400/20",
      accent: "cyan"
    },
    {
      icon: PieChart,
      title: "Power BI / Tableau Reporting",
      description: "Professional business intelligence solutions with advanced analytics, custom visuals, and enterprise-grade security.",
      features: ["Advanced analytics", "Custom visuals", "Enterprise security", "Collaborative sharing"],
      color: "from-pink-400 to-purple-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
      glowColor: "rgba(236, 72, 153, 0.3)",
      gradient: "from-pink-500/20 via-purple-500/10 to-pink-400/20",
      accent: "pink"
    },
    {
      icon: Database,
      title: "Data Cleaning & Automation",
      description: "Automate your data workflows with intelligent cleaning, validation, and transformation processes.",
      features: ["Automated workflows", "Data validation", "Error handling", "Scheduled updates"],
      color: "from-green-400 to-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      glowColor: "rgba(34, 197, 94, 0.3)",
      gradient: "from-green-500/20 via-emerald-500/10 to-green-400/20",
      accent: "green"
    },
    {
      icon: Activity,
      title: "KPI Monitoring",
      description: "Real-time monitoring of key performance indicators with automated alerts and predictive analytics.",
      features: ["Real-time monitoring", "Automated alerts", "Predictive analytics", "Custom thresholds"],
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      glowColor: "rgba(251, 146, 60, 0.3)",
      gradient: "from-orange-500/20 via-red-500/10 to-orange-400/20",
      accent: "orange"
    }
  ]

  // GSAP Scroll Animations for Cards
  useEffect(() => {
    if (cardsRowRef.current) {
      const serviceCards = cardsRowRef.current.querySelectorAll('.service-card')
      
      // Stagger animation for service cards with 3D effect
      gsap.fromTo(serviceCards, 
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: -15,
          rotationX: 10
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRowRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Floating animation for cards
      serviceCards.forEach((card, index) => {
        gsap.to(card, {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })
      })

      // Icon rotation animation
      serviceCards.forEach((card) => {
        const icon = card.querySelector('.service-icon')
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            duration: 8,
            ease: "none",
            repeat: -1,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          })
        }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    let ctx
    if (pinRef.current && cardsRowRef.current) {
      ctx = gsap.context(() => {
        const scrollLength = (NUM_CARDS - 1) * (CARD_WIDTH + CARD_GAP)
        gsap.set(cardsRowRef.current, { x: scrollLength })
        ScrollTrigger.create({
          trigger: pinRef.current,
          start: 'top center',
          end: `+=${scrollLength}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: self => {
            const progress = self.progress
            const newX = scrollLength * (1 - progress)
            gsap.to(cardsRowRef.current, { x: newX, duration: 0.1, overwrite: 'auto' })
            setX(newX)
          },
        })
      }, pinRef)
    }
    return () => ctx && ctx.revert()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 360, 
      scale: 1.15,
      transition: {
        duration: 0.8,
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
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section ref={sectionRef} className="relative pt-8 pb-20 overflow-hidden bg-[#002825] min-h-[600px] flex flex-col justify-center" data-section="services">
      {/* Lottie Background */}
      <LottieBackground 
        animationPath="/Header BG ex Json.json"
        className="opacity-50"
      />
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm font-medium tracking-wide">Our Services</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-display font-bold mb-8 gradient-text-warm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What We <span className="gradient-text">Offer</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-50 mb-12 max-w-3xl mx-auto leading-relaxed font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive data solutions designed to transform your business operations 
            and unlock the full potential of your data.
          </motion.p>
        </motion.div>

        {/* Pinned horizontal card reveal */}
        <div ref={pinRef} className="services-horizontal-pin relative w-full flex items-center justify-center min-h-[60vh]" style={{ height: 'auto' }}>
          <motion.div
            ref={cardsRowRef}
            className="flex flex-row items-stretch"
            style={{ width: TOTAL_WIDTH }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card group relative mr-8 last:mr-0"
                style={{
                  width: CARD_WIDTH,
                  minHeight: `${340 + (index % 2 === 0 ? 0 : 40)}px`,
                  maxHeight: `${400 + (index % 3) * 30}px`,
                  perspective: '800px',
                  willChange: 'transform',
                  zIndex: 10 - index
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: `0 8px 40px ${service.glowColor}`,
                  rotateX: [0, 8, 0],
                  rotateY: [0, -8, 0],
                  transition: { type: 'spring', stiffness: 200, damping: 18 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(service)}
              >
                {/* Service Card */}
                <div className={`card-premium h-full relative overflow-hidden backdrop-blur-sm border border-green-800/50`}>
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl" />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${service.glowColor}, transparent 70%)`,
                      opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Floating Sparkles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 8 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`
                        }}
                        variants={sparkleVariants}
                        initial="initial"
                        whileHover="animate"
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  
                  {/* Content Container */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <motion.div
                        className={`service-icon w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden`}
                        variants={iconVariants}
                        initial="initial"
                        whileHover="hover"
                        style={{
                          boxShadow: `0 10px 30px ${service.glowColor}`
                        }}
                      >
                        {/* Icon Background Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-50 blur-xl`} />
                        
                        <service.icon className="w-10 h-10 text-white relative z-10" />
                        
                        {/* Icon Sparkles */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          {Array.from({ length: 3 }, (_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{
                                left: `${30 + i * 20}%`,
                                top: `${30 + i * 20}%`
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.5
                              }}
                            />
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300"
                        whileHover={{ 
                          textShadow: `0 0 20px ${service.glowColor}`,
                          scale: 1.02
                        }}
                      >
                        {service.title}
                      </motion.h3>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex} 
                            className="flex items-center gap-3 text-sm text-gray-400 group/feature"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            whileHover={{ x: 5, color: "white" }}
                          >
                            <motion.div 
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} group-hover/feature:scale-150 transition-transform duration-300`}
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="group-hover/feature:text-white transition-colors duration-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Learn More Button */}
                      <motion.button
                        className="flex items-center gap-3 text-sm font-semibold text-white/80 hover:text-white transition-colors duration-300 group/button"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Learn More</span>
                        <motion.div
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/button:bg-white/20 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ArrowRight className="w-4 h-4 group-hover/button:translate-x-0.5 transition-transform duration-300" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <motion.div 
                    className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    whileHover={{ scale: 1.02 }}
                  />
                  
                  {/* Corner Accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${service.color} opacity-20 rounded-bl-3xl`}
                    whileHover={{ scale: 1.2, opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="btn-primary flex items-center gap-3 mx-auto group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Sparkle Effect */}
            <motion.div
              className="absolute inset-0"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white/50" />
            </motion.div>
            
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Your Data Transformation
          </motion.button>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 text-6xl opacity-10"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear",
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            📊
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-20 text-4xl opacity-10"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            🔄
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-10 text-2xl opacity-10"
            animate={{ 
              x: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          >
            ⚡
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 