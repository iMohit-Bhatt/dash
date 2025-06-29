// Import your Lottie JSON file here
// Example: import animationData from '../path/to/your/animation.json'

// For now, this is a placeholder - replace with your actual Lottie JSON data
export const lottieAnimationData = {
  // Your Lottie JSON data goes here
  // You can either:
  // 1. Import it directly: import animationData from './your-animation.json'
  // 2. Copy the JSON content here
  // 3. Load it dynamically from the public folder
}

// Alternative: Load from public folder
export const loadLottieAnimation = async () => {
  try {
    const response = await fetch('/your-animation.json')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading Lottie animation:', error)
    return null
  }
} 