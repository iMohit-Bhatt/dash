import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const TrustedBySection = () => {
  // Sample client logos - in a real app, these would be actual client logos
  const clientLogos1 = [
    { name: 'Microsoft', logo: '🏢' },
    { name: 'Google', logo: '🔍' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Meta', logo: '📘' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Tesla', logo: '⚡' },
    { name: 'Spotify', logo: '🎵' },
    { name: 'Uber', logo: '🚗' },
    { name: 'Airbnb', logo: '🏠' },
  ]

  const clientLogos2 = [
    { name: 'Stripe', logo: '💳' },
    { name: 'Slack', logo: '💬' },
    { name: 'Zoom', logo: '📹' },
    { name: 'Salesforce', logo: '☁️' },
    { name: 'Adobe', logo: '🎨' },
    { name: 'Oracle', logo: '🗄️' },
    { name: 'IBM', logo: '🔵' },
    { name: 'Intel', logo: '🔴' },
    { name: 'Cisco', logo: '🌐' },
    { name: 'Dell', logo: '💻' },
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 bg-opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 bg-opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500 bg-opacity-20 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center justify-center">
            <span className="inline-block">
              Trusted by{' '}
              <span className="inline-flex align-middle">
                {[...'200+'].map((char, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-green-400 text-white rounded-md px-3 py-1 mx-0.5 text-3xl md:text-4xl font-bold align-middle"
                    style={{ lineHeight: '1.2' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="ml-2 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent font-bold">
                clients
              </span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the growing list of companies that trust our dashboard solutions
          </p>
        </motion.div>

        {/* First Marquee Container - Right to Left */}
        <div className="relative mb-12 overflow-hidden">
          {/* Marquee 1 - Right to Left */}
          <div 
            className="flex"
            style={{
              animation: 'marquee-left 15s linear infinite'
            }}
          >
            {/* First set of logos */}
            {clientLogos1.map((client, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-3 min-w-[120px] mx-8"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl border border-blue-200 hover:bg-blue-100 transition-all duration-300 hover:scale-110 shadow-sm">
                  {client.logo}
                </div>
                <span className="text-sm text-gray-600 font-medium text-center">
                  {client.name}
                </span>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {clientLogos1.map((client, index) => (
              <motion.div
                key={`second-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-3 min-w-[120px] mx-8"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl border border-blue-200 hover:bg-blue-100 transition-all duration-300 hover:scale-110 shadow-sm">
                  {client.logo}
                </div>
                <span className="text-sm text-gray-600 font-medium text-center">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second Marquee Container - Left to Right */}
        <div className="relative mb-12 overflow-hidden">
          {/* Marquee 2 - Left to Right */}
          <div 
            className="flex"
            style={{
              animation: 'marquee-right 15s linear infinite'
            }}
          >
            {/* First set of logos */}
            {clientLogos2.map((client, index) => (
              <motion.div
                key={`third-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-3 min-w-[120px] mx-8"
              >
                <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-3xl border border-green-200 hover:bg-green-100 transition-all duration-300 hover:scale-110 shadow-sm">
                  {client.logo}
                </div>
                <span className="text-sm text-gray-600 font-medium text-center">
                  {client.name}
                </span>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {clientLogos2.map((client, index) => (
              <motion.div
                key={`fourth-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-3 min-w-[120px] mx-8"
              >
                <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-3xl border border-green-200 hover:bg-green-100 transition-all duration-300 hover:scale-110 shadow-sm">
                  {client.logo}
                </div>
                <span className="text-sm text-gray-600 font-medium text-center">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Industries Served</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedBySection 