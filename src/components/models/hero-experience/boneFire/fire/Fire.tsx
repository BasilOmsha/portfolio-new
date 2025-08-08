import { useMemo, useRef } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import type { FireProps, FireShaderMaterial } from '../../types/types.ts'
import FireMaterial from '../material/Material.tsx'

function Fire({ particlesCount, config }: FireProps) {
    const sparksRef = useRef<THREE.Points>(null)

    const count = useMemo(
        () => particlesCount * config.offsets.length,
        [particlesCount, config.offsets]
    )

    const bufferAttributes = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const offsets = new Float32Array(count * 3)
        const scales = new Float32Array(count)
        const elevation = new Float32Array(count)

        let currentSlot = 1

        for (let i = 0; i < count; i++) {
            // Default sparks positions
            positions[i * 3 + 0] = (Math.random() - 0.5) * 0.2
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5

            // Randomized sparks scales
            scales[i] = Math.random() * 0.5 + 0.5

            // Randomized sparks Y axis elevation
            elevation[i] = 5 + Math.random() * 25.0

            // Place sparks to their correct position depending on each offset
            if (i > (count / config.offsets.length) * currentSlot) {
                currentSlot++
            }
            offsets[i * 3 + 0] = config.offsets[currentSlot - 1][0]
            offsets[i * 3 + 1] = config.offsets[currentSlot - 1][1]
            offsets[i * 3 + 2] = config.offsets[currentSlot - 1][2]
        }

        return { positions, offsets, scales, elevation }
    }, [count, config.offsets])

    const width = useThree((state) => state.size.width)
    const height = useThree((state) => state.size.height)
    const pixelRatio = useThree((state) => state.viewport.dpr)
    const resolution = new THREE.Vector2(width * pixelRatio, height * pixelRatio)

    useFrame((state) => {
        if (sparksRef.current?.material) {
            const material = sparksRef.current.material as FireShaderMaterial
            if (material.uniforms) {
                material.uniforms.uTime.value = state.clock.elapsedTime
                material.uniforms.uResolution.value = resolution
            }
        }
    })

    return (
        <points ref={sparksRef} scale={config.scale} frustumCulled={false} renderOrder={1}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={bufferAttributes.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    array={bufferAttributes.scales}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aElevation"
                    count={count}
                    array={bufferAttributes.elevation}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aOffset"
                    count={count}
                    array={bufferAttributes.offsets}
                    itemSize={3}
                />
            </bufferGeometry>
            <FireMaterial size={config.size} color={config.color} />
        </points>
    )
}

export default Fire
