import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  BarChart3, 
  PieChart, 
  Database, 
  Activity,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Sparkles
} from 'lucide-react'
import LottieBackground from './LottieBackground'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

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
      glowColor: "rgba(6, 182, 212, 0.3)"
    },
    {
      icon: PieChart,
      title: "Power BI / Tableau Reporting",
      description: "Professional business intelligence solutions with advanced analytics, custom visuals, and enterprise-grade security.",
      features: ["Advanced analytics", "Custom visuals", "Enterprise security", "Collaborative sharing"],
      color: "from-pink-400 to-purple-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
      glowColor: "rgba(236, 72, 153, 0.3)"
    },
    {
      icon: Database,
      title: "Data Cleaning & Automation",
      description: "Automate your data workflows with intelligent cleaning, validation, and transformation processes.",
      features: ["Automated workflows", "Data validation", "Error handling", "Scheduled updates"],
      color: "from-green-400 to-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      glowColor: "rgba(34, 197, 94, 0.3)"
    },
    {
      icon: Activity,
      title: "KPI Monitoring",
      description: "Real-time monitoring of key performance indicators with automated alerts and predictive analytics.",
      features: ["Real-time monitoring", "Automated alerts", "Predictive analytics", "Custom thresholds"],
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      glowColor: "rgba(34, 197, 94, 0.3)"
    }
  ]

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
      scale: 1.02,
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
      scale: 1.1,
      transition: {
        duration: 0.6,
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
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-[#002825]" data-section="services">
      {/* Lottie Background */}
      <LottieBackground 
        animationPath="/Header BG ex Json.json"
        className="opacity-50"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What We <span className="gradient-text">Offer</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive data solutions designed to transform your business operations 
            and unlock the full potential of your data.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ y: cardsY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Service Card */}
              <div className={`card h-full ${service.bgColor} ${service.borderColor} relative overflow-hidden backdrop-blur-sm`}>
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
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Floating Sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 5 }, (_, i) => (
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
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300"
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
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center gap-2 text-sm text-gray-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}
                          whileHover={{ scale: 1.5 }}
                        />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>

                {/* Hover Effect Border */}
                <motion.div 
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  whileHover={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

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