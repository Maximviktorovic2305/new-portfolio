'use client'

import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

// Helper function to validate and sanitize float values
function sanitizeFloat(value: number): number {
  if (!isFinite(value) || isNaN(value)) {
    return 0
  }
  return value
}

// Helper function to create safe positions array
function createSafePositions(count: number, radius: number): Float32Array {
  try {
    // Create initial positions
    const positions = random.inSphere(new Float32Array(count * 3), { radius })
    
    // Sanitize all values
    for (let i = 0; i < positions.length; i++) {
      positions[i] = sanitizeFloat(positions[i])
    }
    
    // Apply vortex-like transformations with safety checks
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]
      
      // Skip if any value is zero (likely already sanitized)
      if (x === 0 && y === 0 && z === 0) continue
      
      try {
        // Calculate angle and radius with safety checks
        const angle = sanitizeFloat(Math.atan2(y, x))
        const radius = sanitizeFloat(Math.sqrt(x * x + y * y))
        
        // Apply spiral transformation
        if (angle !== 0 || radius !== 0) {
          const newX = sanitizeFloat(x + Math.cos(angle * 3) * 0.1)
          const newY = sanitizeFloat(y + Math.sin(angle * 3) * 0.1)
          const newZ = sanitizeFloat(z + Math.sin(radius * 5) * 0.05)
          
          positions[i] = newX
          positions[i + 1] = newY
          positions[i + 2] = newZ
        }
      } catch (error) {
        // If transformation fails, keep original sanitized values
        console.warn('Particle transformation failed, keeping original values', error)
      }
    }
    
    // Final validation pass
    let validCount = 0
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]
      
      // Count valid positions
      if (isFinite(x) && isFinite(y) && isFinite(z)) {
        validCount++
      }
    }
    
    // If no valid positions, return a simple fallback
    if (validCount === 0) {
      console.warn('No valid positions found, returning fallback')
      return new Float32Array([0, 0, 0])
    }
    
    return positions
  } catch (error) {
    console.error('Failed to create particle positions, using fallback', error)
    // Return a simple fallback - single point at origin
    return new Float32Array([0, 0, 0])
  }
}

export default function ParticleSystem({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null)
  
  // Use useMemo to ensure positions are only calculated once
  const positions = useMemo(() => {
    const safePositions = createSafePositions(2000, 1.5) // Reduced count for better performance
    
    // Ensure we have a valid array with finite values
    const validatedPositions = new Float32Array(safePositions.length)
    for (let i = 0; i < safePositions.length; i++) {
      validatedPositions[i] = isFinite(safePositions[i]) ? safePositions[i] : 0
    }
    
    return validatedPositions
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      // Add safety checks for delta value
      const safeDelta = isFinite(delta) && delta > 0 && delta < 0.1 ? delta : 0.016
      ref.current.rotation.x -= safeDelta / 10
      ref.current.rotation.y -= safeDelta / 15
    }
  })

  // Don't render if positions are empty
  if (positions.length === 0) {
    return null
  }

  // Ensure we have a multiple of 3
  const validLength = Math.floor(positions.length / 3) * 3
  const validPositions = useMemo(() => {
    return positions.slice(0, validLength)
  }, [positions])

  if (validPositions.length === 0) {
    return null
  }

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={validPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}