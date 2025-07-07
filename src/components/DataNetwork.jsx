import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

const DataNodes = ({ count = 100 }) => {
  const mesh = useRef()
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  })

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

const DataConnections = ({ nodes = 20 }) => {
  const mesh = useRef()
  const [positions] = useState(() => {
    const positions = []
    for (let i = 0; i < nodes; i++) {
      for (let j = i + 1; j < nodes; j++) {
        if (Math.random() > 0.7) {
          const x1 = (Math.random() - 0.5) * 8
          const y1 = (Math.random() - 0.5) * 8
          const z1 = (Math.random() - 0.5) * 8
          const x2 = (Math.random() - 0.5) * 8
          const y2 = (Math.random() - 0.5) * 8
          const z2 = (Math.random() - 0.5) * 8
          positions.push(x1, y1, z1, x2, y2, z2)
        }
      }
    }
    return new Float32Array(positions)
  })

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.05
    }
  })

  return (
    <lineSegments ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" opacity={0.8} transparent />
    </lineSegments>
  )
}

const DataNetwork = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DataNodes count={150} />
        <DataConnections nodes={30} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export default DataNetwork 