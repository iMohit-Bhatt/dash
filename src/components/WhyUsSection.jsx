import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Clock, DollarSign, Target, Zap, Shield, Users, Sparkles } from 'lucide-react'
import LottieBackground from './LottieBackground'

const WhyUsSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const benefitsY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  const benefits = [
    {
      icon: Clock,
      title: "Lightning Fast",
      subtitle: "Speed",
      description: "Get your dashboards up and running in days, not months. Our streamlined process ensures rapid deployment.",
      value: "10x",
      unit: "Faster",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      glowColor: "rgba(6, 182, 212, 0.3)"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      subtitle: "Savings",
      description: "Reduce operational costs by automating manual processes and eliminating data entry errors.",
      value: "60%",
      unit: "Savings",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      glowColor: "rgba(34, 197, 94, 0.3)"
    },
    {
      icon: Target,
      title: "Pinpoint Accuracy",
      subtitle: "Precision",
      description: "Ensure data integrity with automated validation and real-time error detection systems.",
      value: "99.9%",
      unit: "Accuracy",
      color: "from-pink-400 to-purple-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
      glowColor: "rgba(236, 72, 153, 0.3)"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Instant data updates and live dashboards"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 dedicated technical assistance"
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
      y: -12,
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

  const metricVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-[#002825]" data-section="why-us">
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
            Why Choose <span className="gradient-text">Us</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We combine cutting-edge technology with proven methodologies to deliver 
            exceptional results that drive real business value.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          style={{ y: benefitsY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className={`card h-full ${benefit.bgColor} ${benefit.borderColor} relative overflow-hidden backdrop-blur-sm`}>
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${benefit.glowColor}, transparent 70%)`,
                    opacity: 0
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Floating Sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 6 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`
                      }}
                      variants={sparkleVariants}
                      initial="initial"
                      whileHover="animate"
                      transition={{ delay: i * 0.15 }}
                    />
                  ))}
                </div>
                
                {/* Icon */}
                <motion.div
                  className="relative z-10 mb-6"
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-1"
                      whileHover={{ 
                        textShadow: `0 0 20px ${benefit.glowColor}`,
                        scale: 1.02
                      }}
                    >
                      {benefit.title}
                    </motion.h3>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {benefit.subtitle}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Metric */}
                  <motion.div 
                    className="text-center"
                    variants={metricVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <motion.div 
                      className={`text-4xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent mb-1`}
                      whileHover={{ 
                        textShadow: `0 0 30px ${benefit.glowColor}`,
                        scale: 1.1
                      }}
                    >
                      {benefit.value}
                    </motion.div>
                    <div className="text-sm text-gray-400">
                      {benefit.unit}
                    </div>
                  </motion.div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)"
                }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-white mb-2"
                whileHover={{ 
                  textShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
                  scale: 1.02
                }}
              >
                {feature.title}
              </motion.h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understand your needs" },
              { step: "02", title: "Design", desc: "Create the solution" },
              { step: "03", title: "Develop", desc: "Build & implement" },
              { step: "04", title: "Deploy", desc: "Launch & support" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)"
                  }}
                >
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </motion.div>
                <motion.h4 
                  className="text-lg font-semibold text-white mb-1"
                  whileHover={{ 
                    textShadow: "0 0 15px rgba(168, 85, 247, 0.8)",
                    scale: 1.02
                  }}
                >
                  {item.title}
                </motion.h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 text-5xl opacity-10"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear",
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            ⚡
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-10 text-4xl opacity-10"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          >
            🎯
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-10 text-3xl opacity-10"
            animate={{ 
              x: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 4
            }}
          >
            💰
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection 