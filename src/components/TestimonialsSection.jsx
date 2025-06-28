import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote, Sparkles } from 'lucide-react'

const TestimonialsSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const testimonialsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Analyst",
      company: "TechCorp Inc.",
      content: "The dashboard transformation was incredible! What used to take hours of manual work now updates automatically. Our team can focus on insights instead of data entry.",
      rating: 5,
      avatar: "👩‍💼",
      color: "from-cyan-400 to-blue-500",
      glowColor: "rgba(6, 182, 212, 0.3)"
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "Global Solutions",
      content: "The KPI monitoring system has revolutionized how we track performance. Real-time alerts help us stay ahead of issues before they become problems.",
      rating: 5,
      avatar: "👨‍💼",
      color: "from-green-400 to-emerald-500",
      glowColor: "rgba(34, 197, 94, 0.3)"
    },
    {
      name: "Emily Rodriguez",
      role: "Business Intelligence Lead",
      company: "InnovateTech",
      content: "From messy Excel files to beautiful, interactive dashboards. The automation has saved us countless hours and improved our decision-making process.",
      rating: 5,
      avatar: "👩‍💻",
      color: "from-pink-400 to-purple-500",
      glowColor: "rgba(236, 72, 153, 0.3)"
    },
    {
      name: "David Thompson",
      role: "CEO",
      company: "StartupXYZ",
      content: "The data cleaning automation has been a game-changer. We now have confidence in our data quality and can make strategic decisions with certainty.",
      rating: 5,
      avatar: "👨‍💼",
      color: "from-yellow-400 to-orange-500",
      glowColor: "rgba(234, 179, 8, 0.3)"
    },
    {
      name: "Lisa Wang",
      role: "Finance Director",
      company: "GrowthCo",
      content: "The Power BI integration exceeded our expectations. Beautiful visualizations that tell our story and help stakeholders understand complex data instantly.",
      rating: 5,
      avatar: "👩‍💼",
      color: "from-purple-400 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.3)"
    },
    {
      name: "James Wilson",
      role: "Marketing Manager",
      company: "BrandBoost",
      content: "Real-time reporting has transformed our marketing campaigns. We can now optimize performance on the fly and see immediate ROI improvements.",
      rating: 5,
      avatar: "👨‍💼",
      color: "from-blue-400 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.3)"
    }
  ]

  const clientLogos = [
    "TechCorp Inc.",
    "Global Solutions",
    "InnovateTech",
    "StartupXYZ",
    "GrowthCo",
    "BrandBoost",
    "DataFlow Systems",
    "SmartAnalytics"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const starVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 360,
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
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section ref={sectionRef} className="section relative py-20 overflow-hidden" data-section="testimonials">
      {/* Ambient Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
          />
        </div>
      </motion.div>

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
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Don't just take our word for it. Here's what our clients have to say about 
            their data transformation journey with us.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          style={{ y: testimonialsY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="card h-full relative overflow-hidden backdrop-blur-sm">
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${testimonial.glowColor}, transparent 70%)`,
                    opacity: 0
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Quote Icon */}
                <motion.div 
                  className="absolute top-4 right-4 text-4xl opacity-10"
                  whileHover={{ 
                    scale: 1.2,
                    opacity: 0.3,
                    rotate: 360
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote className="w-8 h-8 text-cyan-400" />
                </motion.div>

                {/* Floating Sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 4 }, (_, i) => (
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
                      transition={{ delay: i * 0.2 }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <motion.div
                        key={i}
                        variants={starVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-gray-300 text-sm leading-relaxed mb-6 italic"
                    whileHover={{ 
                      textShadow: `0 0 10px ${testimonial.glowColor}`,
                      scale: 1.01
                    }}
                  >
                    "{testimonial.content}"
                  </motion.p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="text-2xl"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <motion.div 
                        className="font-semibold text-white text-sm"
                        whileHover={{ 
                          textShadow: `0 0 15px ${testimonial.glowColor}`,
                          scale: 1.02
                        }}
                      >
                        {testimonial.name}
                      </motion.div>
                      <div className="text-gray-400 text-xs">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                  whileHover={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h3 
            className="text-2xl font-semibold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Trusted by Industry Leaders
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="glass rounded-lg p-4 text-center group backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
                }}
              >
                <motion.div 
                  className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300"
                  whileHover={{ 
                    textShadow: "0 0 15px rgba(6, 182, 212, 0.8)",
                    scale: 1.02
                  }}
                >
                  {logo}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            { value: "500+", label: "Projects Completed", color: "from-cyan-400 to-blue-500" },
            { value: "98%", label: "Client Satisfaction", color: "from-green-400 to-emerald-500" },
            { value: "24/7", label: "Support Available", color: "from-pink-400 to-purple-500" },
            { value: "50+", label: "Enterprise Clients", color: "from-yellow-400 to-orange-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                whileHover={{ 
                  textShadow: "0 0 30px rgba(6, 182, 212, 0.8)",
                  scale: 1.1
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 text-4xl opacity-10"
            animate={{ 
              rotate: 360,
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity, 
              ease: "linear",
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-20 text-3xl opacity-10"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 3
            }}
          >
            💬
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-10 text-2xl opacity-10"
            animate={{ 
              x: [0, 25, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 5
            }}
          >
            🏆
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection 