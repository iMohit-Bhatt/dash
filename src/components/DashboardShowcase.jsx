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
    <section
      ref={sectionRef}
      className="relative z-30 flex flex-col items-center min-h-[600px] bg-white"
      style={{ paddingBottom: '4rem', paddingTop: '4rem' }}
    >
      {/* Dashboard Image Container - Only the card overlaps the hero section by 20% */}
      <div className="relative w-full flex justify-center z-30" style={{ marginTop: '-20vh', marginBottom: '2rem' }}>
        <div className="glass rounded-3xl shadow-2xl border border-white/20 overflow-hidden w-[97%] max-w-screen-2xl flex justify-center items-center aspect-[16/9]" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)' }}>
          <img src="/dash1.png" alt="Dashboard Example" className="w-full h-full object-cover" />
        </div>
      </div>

    </section>
  )
}

export default DashboardShowcase 