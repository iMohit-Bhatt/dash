import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, TrendingUp, Users, Target, Zap, Shield, Clock, Award } from 'lucide-react'

const DashboardDemo = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const stats = [
    { icon: Users, value: "200+", label: "Clients Served", color: "from-yellow-500 to-yellow-400" },
    { icon: Clock, value: "16+", label: "Years Experience", color: "from-yellow-400 to-yellow-300" },
    { icon: Award, value: "100%", label: "Client Satisfaction", color: "from-yellow-300 to-yellow-200" },
    { icon: Zap, value: "24/7", label: "Support Available", color: "from-yellow-200 to-yellow-100" }
  ]

  const services = [
    {
      icon: Shield,
      title: "Data Integration",
      description: "Ensuring complete, accurate, and timely data, we integrate and consolidate your business' data sources into a cohesive model, from a few spreadsheets to millions of rows of data.",
      color: "from-yellow-500 to-yellow-400"
    },
    {
      icon: TrendingUp,
      title: "Data Analysis & Alignment",
      description: "Executing deep data analysis, we turn raw data into valuable business insights, helping you align your data with your goals and initiatives for maximum ROI.",
      color: "from-yellow-400 to-yellow-300"
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "We turn static spreadsheets and confusing dashboards into vivid, clear data visualizations that help you better use and understand your data.",
      color: "from-yellow-300 to-yellow-200"
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={sectionRef} className="section-warm relative py-32 overflow-hidden" data-section="dashboard">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-900/5 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
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
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-6">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-100 text-sm font-medium tracking-wide">Trusted by 200+ Clients</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-display font-bold mb-8 gradient-text-warm"
            variants={itemVariants}
          >
            We make your data clear and useful, and your decisions data-driven.
          </motion.h2>

          <motion.p 
            className="text-xl text-yellow-50 mb-12 max-w-3xl mx-auto leading-relaxed font-body"
            variants={itemVariants}
          >
            Partner with former <span className="text-yellow-400 font-semibold">BCG, McKinsey, and Bain</span> Analytics Consultants.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={itemVariants}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 glass-warm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                whileHover={{ 
                  boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <stat.icon className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-yellow-200 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="card-premium group"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className={`w-16 h-16 mb-6 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ 
                  boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)",
                  transition: { duration: 0.3 }
                }}
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-200 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-yellow-50 leading-relaxed font-body">
                {service.description}
              </p>

              {/* Hover Sparkles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <motion.button
              className="btn-primary-warm group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Book Call with Analytics Expert
              </span>
              
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DashboardDemo 