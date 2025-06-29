import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import LottieBackground from './LottieBackground'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arjun V.",
      role: "CEO, Zoko",
      rating: 4.75,
      content: "I had a complicated request that required a nuanced understanding of what I needed in a visualization. Data Family delivered it beautifully and quickly. I am so pleased with the work!",
      image: "/Zoko.jpeg"
    },
    {
      name: "Paul Estes",
      role: "Founder, Estes Media",
      rating: 4.65,
      content: "We have just delivered what would be one of the most complex PowerBI dashboards, it's taken months of work, but Data Family has smashed it and our client is super happy. Highly recommended!",
      image: "/Estes.jpeg"
    },
    {
      name: "Bert Helbig",
      role: "CEO, X Corporation",
      rating: 4.5,
      content: "Excellent job with my company's AI-powered SaaS project. We were looking to integrate GPT 4 and other LLMs and Data Family did an absolutely fantastic job in planning and implementation. I highly recommend them!",
      image: "/Arjun.jpeg"
    },
    {
      name: "Bert Helbig",
      role: "CEO, X Corporation",
      rating: 4.5,
      content: "Working with Data Family was seamless. Professional, responsive, knowledgeable and on time. We would absolutely use them again as a resource for our future BI / Power BI and Tableau needs.",
      image: "/Arjun.jpeg"
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

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-green-400" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-green-400 text-green-400" />
          </div>
        </div>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-green-400/30" />
      )
    }

    return stars
  }

  return (
    <section className="relative py-32 overflow-hidden bg-[#002825]">
      {/* Lottie Background */}
      <LottieBackground 
        animationPath="/Header BG ex Json.json"
        className="opacity-50"
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />
      
      {/* Floating Quote Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Quote className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm font-medium tracking-wide">Client Success Stories</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-display font-bold mb-8 gradient-text-warm"
            variants={itemVariants}
          >
            Delighted Customers Since 2019.
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-50 max-w-3xl mx-auto leading-relaxed font-body"
            variants={itemVariants}
          >
            Here's what makes Data Family truly unique. It's not just about gaining more value from your data.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card-premium group relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Quote Icon */}
              <motion.div
                className="absolute top-6 right-6 text-green-400/20 group-hover:text-green-400/40 transition-colors duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Quote className="w-8 h-8" />
              </motion.div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-green-200 text-sm font-medium">
                  {testimonial.rating}
                </span>
              </div>

              {/* Content */}
              <p className="text-green-50 leading-relaxed font-body mb-6 text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(43, 182, 115, 0.4)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {testimonial.name.charAt(0)}
                </motion.div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-green-300 text-sm">{testimonial.role}</div>
                </div>
              </div>

              {/* Hover Sparkles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {Array.from({ length: 4 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                      left: `${15 + i * 25}%`,
                      top: `${20 + i * 15}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>

              {/* Gradient Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-green-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(43, 182, 115, 0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%'
                }}
                animate={{
                  backgroundPosition: ['200% 200%', '-200% -200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
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
                <Star className="w-5 h-5" />
                Book Free Consultation
              </span>
              
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 rounded-full"
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

export default Testimonials 