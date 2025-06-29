import { useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-react'

const LottieBackground = ({ animationData, animationPath, className = "" }) => {
  const lottieRef = useRef(null)
  const [animation, setAnimation] = useState(animationData)

  useEffect(() => {
    // If animationPath is provided, load the animation dynamically
    if (animationPath && !animationData) {
      fetch(animationPath)
        .then(response => response.json())
        .then(data => setAnimation(data))
        .catch(error => console.error('Error loading Lottie animation:', error))
    }
  }, [animationPath, animationData])

  useEffect(() => {
    if (lottieRef.current && animation) {
      // Set the animation to loop and play
      lottieRef.current.setSpeed(0.5) // Slow down the animation
      lottieRef.current.play()
    }
  }, [animation])

  if (!animation) {
    return null // Don't render anything if no animation data
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animation}
        loop={true}
        autoplay={true}
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(0.6)', // Make it smaller
          filter: 'blur(1px)'
        }}
      />
    </div>
  )
}

export default LottieBackground 