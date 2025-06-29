import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Download, Calendar } from 'lucide-react'
import LottieBackground from './LottieBackground'

const METRICS = [
  { label: 'Total Visits', value: 191158, budget: 203645, lastYear: 187677, color: 'text-green-400' },
  { label: 'Subscriptions', value: 80370, budget: 203645, lastYear: 187677, color: 'text-green-300' },
  { label: 'Tickets', value: 110804, budget: 203645, lastYear: 187677, color: 'text-green-300' },
]

const MONTHS = [
  { month: 'May 2022', golf: 7123, driving: 1543, virtual: 0, total: 8666 },
  { month: 'June 2022', golf: 7450, driving: 1600, virtual: 0, total: 9050 },
  { month: 'July 2022', golf: 7677, driving: 1647, virtual: 0, total: 12345, current: true },
  { month: 'August 2022', golf: 7890, driving: 1700, virtual: 0, total: 9590 },
]

const CHART_DATA = [
  20000, 18000, 25000, 30000, 22000, 27000, 32000
]
const BUDGET_DATA = [
  22000, 20000, 26000, 31000, 24000, 28000, 34000
]

const CHART_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const Y_LABELS = [0, 10000, 20000, 30000, 40000]

function useCountUp(target, inView, duration = 1.2) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return setValue(0)
    let start = 0
    const startTime = performance.now()
    function animate(now) {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setValue(target)
    }
    requestAnimationFrame(animate)
    // eslint-disable-next-line
  }, [target, inView])
  return value
}

// Helper to create a smooth SVG path (Catmull-Rom to Bezier)
function getSmoothPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0][0]},${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i]
    const [x1, y1] = points[i + 1]
    const xc = (x0 + x1) / 2
    const yc = (y0 + y1) / 2
    d += ` Q ${x0},${y0} ${xc},${yc}`
  }
  d += ` T ${points[points.length - 1][0]},${points[points.length - 1][1]}`
  return d
}

const DashboardShowcase = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const animatedValues = METRICS.map(m => useCountUp(m.value, inView, 1.2))
  const percentChange = -6.1
  const lastUpdated = 'July 18, 2024, 09:42 AM'

  // Accordion state: expanded month index
  const defaultIdx = MONTHS.findIndex(m => m.current) !== -1 ? MONTHS.findIndex(m => m.current) : 0
  const [expandedIdx, setExpandedIdx] = useState(defaultIdx)

  // Chart dimensions
  const chartHeight = 300
  const chartWidth = 800
  const chartPadding = 48
  const yMax = 40000
  const yStep = (chartHeight - chartPadding * 1.1) / (Y_LABELS.length - 1)
  const xStep = (chartWidth - chartPadding * 1.2) / (CHART_LABELS.length - 1)

  // Map data to SVG points
  const getY = v => chartHeight - chartPadding - (v / yMax) * (chartHeight - chartPadding * 1.1)
  const getX = i => chartPadding + i * xStep
  const visitsPoints = CHART_DATA.map((v, i) => [getX(i), getY(v)])
  const budgetPoints = BUDGET_DATA.map((v, i) => [getX(i), getY(v)])

  // Use sectionRef for scroll progress (from Hero to DashboardShowcase)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] })
  const rawScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.7, 0.7, 1])
  const scale = useSpring(rawScale, { stiffness: 120, damping: 18 })

  return (
    <section ref={sectionRef} className="section-warm relative py-16 flex justify-center items-center min-h-[600px] bg-[#002825]">
      {/* Lottie Background */}
      <LottieBackground 
        animationPath="/Header BG ex Json.json"
        className="opacity-50"
      />
      
      <motion.div
        style={{ boxShadow: '0 8px 48px rgba(43, 182, 115, 0.2)', scale }}
        className="relative rounded-3xl border border-green-900 bg-[#002825] shadow-2xl max-w-6xl w-full flex flex-col md:flex-row overflow-hidden"
      >
        {/* Sidebar */}
        <aside className="md:w-1/3 w-full bg-[#002825] border-r border-green-900 p-8 flex flex-col min-w-[260px] relative">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-500 font-bold text-xl tracking-tight">datafamily</span>
              <span className="text-green-200 text-sm">| Power BI</span>
            </div>
            <h2 className="font-display text-3xl text-green-100 font-bold mb-1 leading-tight">Visit Report</h2>
            <div className="text-green-300 text-sm mb-6">Monthly analytics for your organization</div>
            <div className="text-green-400 text-xs font-semibold mb-2 mt-4 tracking-wide uppercase">Recent Months</div>
            <div className="space-y-4 mb-6">
              {MONTHS.map((m, idx) => {
                const expanded = expandedIdx === idx
                return (
                  <motion.div
                    key={m.month}
                    className={`relative rounded-2xl glass-warm border border-green-900 px-5 py-3 flex flex-col shadow-lg transition-all duration-300 group cursor-pointer ${expanded ? 'ring-2 ring-green-400 bg-gradient-to-br from-green-900/40 to-green-400/10' : 'hover:ring-1 hover:ring-green-400/60 hover:bg-green-900/10'}`}
                    onClick={() => setExpandedIdx(idx)}
                    initial={false}
                    animate={{
                      height: expanded ? 'auto' : 64,
                      boxShadow: expanded ? '0 0 32px rgba(43, 182, 115, 0.3)' : '0 0 16px rgba(43, 182, 115, 0.15)',
                      marginBottom: expanded ? 16 : 0,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-green-400 opacity-80" />
                      <span className={`font-bold text-green-100 text-lg tracking-tight ${expanded ? '' : 'truncate'}`}>{m.month}</span>
                      {m.current && <span className="inline-block bg-green-900 text-green-400 px-2 py-0.5 rounded-full text-xs font-semibold ml-2">Current</span>}
                      <span className="ml-auto font-bold text-green-400 text-base">{m.total}</span>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: expanded ? 1 : 0,
                        height: expanded ? 'auto' : 0,
                        marginTop: expanded ? 8 : 0,
                        pointerEvents: expanded ? 'auto' : 'none',
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-green-200">
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-400">Golf</span>
                          <span>{m.golf}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-300">Driving</span>
                          <span>{m.driving}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-200">Virtual</span>
                          <span>{m.virtual}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-100">Total</span>
                          <span>{m.total}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
          {/* Download button at bottom */}
          <div className="mt-auto flex flex-col items-center pt-6">
            <motion.button
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold shadow hover:shadow-lg transition-all text-sm"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-4 h-4" /> Download Report
            </motion.button>
            <span className="text-green-400 text-xs mt-2">Last updated: {lastUpdated}</span>
          </div>
          {/* Vertical divider for mobile */}
          <div className="absolute top-0 right-0 h-full w-0.5 bg-green-900/40 hidden md:block" />
        </aside>
        {/* Main Dashboard */}
        <div className="flex-1 flex flex-col p-8 bg-[#00332f]">
          {/* Top Metrics */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {METRICS.map((m, i) => (
              <div key={m.label} className="flex-1 rounded-2xl bg-[#002825] border border-green-900 p-6 flex flex-col justify-between min-w-[140px] shadow-md">
                <div className={`text-3xl md:text-4xl font-bold font-display ${m.color}`}>{animatedValues[i].toLocaleString()}</div>
                <div className="text-green-200 text-sm font-semibold mt-2">{m.label}</div>
                <div className="text-green-400 text-xs mt-1">Budget: {m.budget.toLocaleString()}<br/>Last year: {m.lastYear.toLocaleString()}</div>
              </div>
            ))}
          </div>
          {/* Divider */}
          <div className="w-full h-0.5 bg-green-900/40 rounded-full mb-8" />
          {/* Chart & % Change */}
          <div className="flex flex-col flex-1">
            {/* Power BI Style Chart */}
            <div
              className="w-full bg-[#002825] border border-green-900 rounded-2xl p-0 flex flex-col shadow-md glass-warm overflow-hidden relative"
            >
              {/* Card Header */}
              <div className="flex items-center gap-2 px-6 pt-6 pb-2">
                <span className="font-semibold text-green-100 text-lg">Weekly Visits</span>
              </div>
              {/* Chart Area */}
              <div className="relative flex w-full" style={{ minHeight: chartHeight + 32, height: chartHeight + 32 }}>
                {/* Y-axis labels and grid lines */}
                <div className="relative flex flex-col justify-between items-end pr-2 py-6" style={{ height: chartHeight, minWidth: 48 }}>
                  {Y_LABELS.slice().reverse().map((y, i) => {
                    const yPos = ((chartHeight - chartPadding) - (y / yMax) * (chartHeight - chartPadding * 1.1));
                    return (
                      <div key={i} style={{ position: 'relative', height: i === 0 ? 0 : yStep, width: '100%' }}>
                        <span className="text-green-400 text-xs opacity-70 absolute right-0" style={{ top: -8 }}>{y === 0 ? '0K' : `${y / 1000}0K`}</span>
                        {/* Grid line (SVG, absolutely positioned) */}
                        <svg width="100%" height="1" style={{ position: 'absolute', left: 48, right: 0, top: 0, zIndex: 0 }}>
                          <line x1={0} x2={chartWidth} y1={0} y2={0} stroke="#B3C2C0" strokeOpacity={0.1} strokeWidth={1} />
                        </svg>
                      </div>
                    )
                  })}
                </div>
                {/* Chart SVG */}
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="flex-1 w-full h-full" style={{ height: chartHeight, minHeight: chartHeight, maxWidth: '100%' }}>
                  {/* Horizontal grid lines (for alignment in SVG, behind everything) */}
                  {Y_LABELS.map((y, i) => {
                    const yPos = getY(y)
                    return (
                      <line
                        key={i}
                        x1={0}
                        x2={chartWidth}
                        y1={yPos}
                        y2={yPos}
                        stroke="#B3C2C0"
                        strokeOpacity={0.1}
                        strokeWidth={1}
                      />
                    )
                  })}
                  {/* Background bars */}
                  {CHART_LABELS.map((label, i) => {
                    // Add spacing between bars
                    const barGap = 12
                    const barW = xStep - barGap
                    const x = getX(i) - barW / 2
                    const barH = chartHeight - chartPadding - getY(CHART_DATA[i])
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={getY(CHART_DATA[i])}
                        width={barW}
                        height={barH}
                        rx={8}
                        fill="#2BB673"
                        opacity={0.1}
                      />
                    )
                  })}
                  {/* Budget line */}
                  <path
                    d={getSmoothPath(budgetPoints)}
                    fill="none"
                    stroke="#3BB186"
                    strokeWidth={2.5}
                    opacity={0.7}
                  />
                  {/* Visits line */}
                  <path
                    d={getSmoothPath(visitsPoints)}
                    fill="none"
                    stroke="#2BB673"
                    strokeWidth={3.5}
                    opacity={0.9}
                  />
                </svg>
                {/* X-axis labels */}
                <div className="absolute left-0 bottom-0 w-full flex justify-between px-8 pb-2">
                  {CHART_LABELS.map((d, i) => (
                    <span key={i} className="text-green-400 text-xs opacity-70">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default DashboardShowcase 