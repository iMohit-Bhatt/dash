import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react'

const DashboardDemo = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const chartScale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1])
  const chartOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])

  return (
    <section ref={sectionRef} data-section="dashboard" className="section relative py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="space-y-8"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Watch Your <span className="gradient-text">Data Come Alive</span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform your raw Excel data into interactive, real-time dashboards that tell compelling stories. 
              Our solutions turn complex data into actionable insights with stunning visualizations.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Real-time data synchronization</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span>Interactive charts and filters</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Automated reporting workflows</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            style={{ scale: chartScale, opacity: chartOpacity }}
            className="relative"
          >
            {/* Excel Sheet Background */}
            <motion.div
              className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl border border-white border-opacity-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Excel Grid */}
              <div className="p-6">
                <div className="grid grid-cols-6 gap-1 text-xs text-white text-opacity-60">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="h-6 bg-white bg-opacity-5 rounded flex items-center justify-center">
                      {i < 6 ? String.fromCharCode(65 + i) : Math.floor(Math.random() * 1000)}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Dashboard Overlay */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-800 bg-opacity-90 to-slate-900 bg-opacity-90 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Sales Dashboard</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Bar Chart */}
                <motion.div
                  className="bg-white bg-opacity-5 rounded-lg p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm text-white text-opacity-80">Revenue Trend</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {[20, 35, 25, 45, 30, 55, 40].map((height, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                        style={{ height: `${height}%`, width: '12px' }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 + 1.5 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                  className="bg-white bg-opacity-5 rounded-lg p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <PieChart className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-white text-opacity-80">Market Share</span>
                  </div>
                  <div className="relative w-16 h-16 mx-auto">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                      />
                      <motion.circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="#d946ef"
                        strokeWidth="2"
                        strokeDasharray="44 100"
                        strokeDashoffset="44"
                        initial={{ strokeDashoffset: 44 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1, delay: 2 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white">
                      44%
                    </div>
                  </div>
                </motion.div>

                {/* Line Chart */}
                <motion.div
                  className="bg-white bg-opacity-5 rounded-lg p-4 col-span-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-white text-opacity-80">Growth Metrics</span>
                  </div>
                  <div className="relative h-12">
                    <svg className="w-full h-full" viewBox="0 0 100 20">
                      <motion.path
                        d="M0,15 L20,10 L40,8 L60,5 L80,3 L100,1"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 2.5 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { label: "Revenue", value: "$2.4M", change: "+12%", color: "text-cyan-500" },
                  { label: "Orders", value: "1,234", change: "+8%", color: "text-pink-500" },
                  { label: "Growth", value: "24%", change: "+5%", color: "text-yellow-500" }
                ].map((kpi, i) => (
                  <motion.div
                    key={i}
                    className="bg-white bg-opacity-5 rounded-lg p-3 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 3 + i * 0.1 }}
                  >
                    <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
                    <div className="text-xs text-white text-opacity-60">{kpi.label}</div>
                    <div className="text-xs text-green-400">{kpi.change}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DashboardDemo 