import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Analyst",
      company: "TechCorp Inc.",
      content: "The dashboard transformation was incredible! What used to take hours of manual work now updates automatically. Our team can focus on insights instead of data entry.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "Global Solutions",
      content: "The KPI monitoring system has revolutionized how we track performance. Real-time alerts help us stay ahead of issues before they become problems.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Emily Rodriguez",
      role: "Business Intelligence Lead",
      company: "InnovateTech",
      content: "From messy Excel files to beautiful, interactive dashboards. The automation has saved us countless hours and improved our decision-making process.",
      rating: 5,
      avatar: "👩‍💻"
    },
    {
      name: "David Thompson",
      role: "CEO",
      company: "StartupXYZ",
      content: "The data cleaning automation has been a game-changer. We now have confidence in our data quality and can make strategic decisions with certainty.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Lisa Wang",
      role: "Finance Director",
      company: "GrowthCo",
      content: "The Power BI integration exceeded our expectations. Beautiful visualizations that tell our story and help stakeholders understand complex data instantly.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "James Wilson",
      role: "Marketing Manager",
      company: "BrandBoost",
      content: "Real-time reporting has transformed our marketing campaigns. We can now optimize performance on the fly and see immediate ROI improvements.",
      rating: 5,
      avatar: "👨‍💼"
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
        staggerChildren: 0.1
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
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about 
            their data transformation journey with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card h-full relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-4xl opacity-10">
                  <Quote className="w-8 h-8 text-neon-cyan" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-neon-yellow text-neon-yellow" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
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
          <h3 className="text-2xl font-semibold text-white mb-8">
            Trusted by Industry Leaders
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="glass rounded-lg p-4 text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                  {logo}
                </div>
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
            { number: "500+", label: "Dashboards Created" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "50+", label: "Companies Served" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-10 text-2xl opacity-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-10 text-2xl opacity-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            💬
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection 