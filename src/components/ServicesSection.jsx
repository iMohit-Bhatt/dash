import { motion } from 'framer-motion'
import { 
  BarChart3, 
  PieChart, 
  Database, 
  Activity,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Excel Dashboards",
      description: "Transform your Excel spreadsheets into interactive, real-time dashboards with advanced visualizations and automated updates.",
      features: ["Dynamic charts", "Real-time data", "Custom filters", "Mobile responsive"],
      color: "from-neon-cyan to-primary-500",
      bgColor: "bg-neon-cyan/10",
      borderColor: "border-neon-cyan/30"
    },
    {
      icon: PieChart,
      title: "Power BI / Tableau Reporting",
      description: "Professional business intelligence solutions with advanced analytics, custom visuals, and enterprise-grade security.",
      features: ["Advanced analytics", "Custom visuals", "Enterprise security", "Collaborative sharing"],
      color: "from-neon-pink to-secondary-500",
      bgColor: "bg-neon-pink/10",
      borderColor: "border-neon-pink/30"
    },
    {
      icon: Database,
      title: "Data Cleaning & Automation",
      description: "Automate your data workflows with intelligent cleaning, validation, and transformation processes.",
      features: ["Automated workflows", "Data validation", "Error handling", "Scheduled updates"],
      color: "from-neon-yellow to-accent-500",
      bgColor: "bg-neon-yellow/10",
      borderColor: "border-neon-yellow/30"
    },
    {
      icon: Activity,
      title: "KPI Monitoring",
      description: "Real-time monitoring of key performance indicators with automated alerts and predictive analytics.",
      features: ["Real-time monitoring", "Automated alerts", "Predictive analytics", "Custom thresholds"],
      color: "from-neon-green to-accent-400",
      bgColor: "bg-neon-green/10",
      borderColor: "border-neon-green/30"
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
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive data solutions designed to transform your business operations 
            and unlock the full potential of your data.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Service Card */}
              <div className={`card h-full ${service.bgColor} ${service.borderColor} relative overflow-hidden`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
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
            className="btn-primary flex items-center gap-3 mx-auto group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Your Data Transformation
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 text-6xl opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            📊
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-20 text-4xl opacity-10"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🔄
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 