import { motion } from 'framer-motion'
import { Clock, DollarSign, Target, Zap, Shield, Users } from 'lucide-react'

const WhyUsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Lightning Fast",
      subtitle: "Speed",
      description: "Get your dashboards up and running in days, not months. Our streamlined process ensures rapid deployment.",
      value: "10x",
      unit: "Faster",
      color: "from-neon-cyan to-primary-500",
      bgColor: "bg-neon-cyan/10",
      borderColor: "border-neon-cyan/30"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      subtitle: "Savings",
      description: "Reduce operational costs by automating manual processes and eliminating data entry errors.",
      value: "60%",
      unit: "Savings",
      color: "from-neon-green to-accent-500",
      bgColor: "bg-neon-green/10",
      borderColor: "border-neon-green/30"
    },
    {
      icon: Target,
      title: "Pinpoint Accuracy",
      subtitle: "Precision",
      description: "Ensure data integrity with automated validation and real-time error detection systems.",
      value: "99.9%",
      unit: "Accuracy",
      color: "from-neon-pink to-secondary-500",
      bgColor: "bg-neon-pink/10",
      borderColor: "border-neon-pink/30"
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
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="section relative py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine cutting-edge technology with proven methodologies to deliver 
            exceptional results that drive real business value.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`card h-full ${benefit.bgColor} ${benefit.borderColor} relative overflow-hidden`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <motion.div
                  className="relative z-10 mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {benefit.subtitle}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Metric */}
                  <div className="text-center">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent mb-1`}>
                      {benefit.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {benefit.unit}
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
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
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
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
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our <span className="gradient-text">Process</span>
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understand your needs" },
              { step: "02", title: "Design", desc: "Create custom solutions" },
              { step: "03", title: "Develop", desc: "Build and test" },
              { step: "04", title: "Deploy", desc: "Launch and support" }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {/* Step Number */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {phase.step}
                </div>
                
                {/* Title */}
                <h4 className="text-lg font-semibold text-white mb-2">
                  {phase.title}
                </h4>
                
                {/* Description */}
                <p className="text-gray-400 text-sm">
                  {phase.desc}
                </p>

                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className="btn-primary flex items-center gap-3 mx-auto group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Your Transformation Today
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/3 left-20 text-3xl opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            ⚡
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-20 text-2xl opacity-10"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            🎯
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl opacity-5"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            💎
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection 