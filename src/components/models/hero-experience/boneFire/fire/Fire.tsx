import { useEffect, useMemo, useRef, useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import type { FireProps, FireShaderMaterial } from '../../types/types.ts'
import FireMaterial from '../material/Material.tsx'

// Initialize worker
let fireWorkerInstance: Worker | null = null
const getFireWorker = () => {
    if (!fireWorkerInstance) {
        fireWorkerInstance = new Worker(
            new URL('@/workers/fireParticle.worker.ts', import.meta.url),
            { type: 'module' }
        )
    }
    return fireWorkerInstance
}

// Generate unique ID for each Fire component instance
let instanceCounter = 0
const generateId = () => `fire-${++instanceCounter}-${Date.now()}`

function Fire({ particlesCount, config }: FireProps) {
    const sparksRef = useRef<THREE.Points>(null)

    const instanceIdRef = useRef<string>(generateId())

    const count = useMemo(
        () => particlesCount * config.offsets.length,
        [particlesCount, config.offsets]
    )

    const [buffersReady, setBuffersReady] = useState(false)
    const buffersRef = useRef<{
        positions: Float32Array
        offsets: Float32Array
        scales: Float32Array
        elevation: Float32Array
    } | null>(null)

    useEffect(() => {
        const worker = getFireWorker()
        const myId = instanceIdRef.current
        setBuffersReady(false)

        const handleMessage = (e: MessageEvent) => {
            if (e.data.type === 'initialized' && e.data.id === myId) {
                buffersRef.current = {
                    positions: new Float32Array(e.data.positions),
                    offsets: new Float32Array(e.data.offsets),
                    scales: new Float32Array(e.data.scales),
                    elevation: new Float32Array(e.data.elevation)
                }
                setBuffersReady(true)
            }
        }

        worker.addEventListener('message', handleMessage)

        // Send work to worker with unique ID
        worker.postMessage({
            type: 'init',
            id: myId,
            data: {
                particlesCount,
                offsetsLength: config.offsets.length,
                offsets: config.offsets
            }
        })

        return () => {
            worker.removeEventListener('message', handleMessage)
        }
    }, [particlesCount, config.offsets])

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

    if (!buffersReady || !buffersRef.current) {
        return null
    }

    return (
        <points ref={sparksRef} scale={config.scale} frustumCulled={false} renderOrder={1}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={buffersRef.current.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    array={buffersRef.current.scales}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aElevation"
                    count={count}
                    array={buffersRef.current.elevation}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aOffset"
                    count={count}
                    array={buffersRef.current.offsets}
                    itemSize={3}
                />
            </bufferGeometry>
            <FireMaterial
                size={config.size}
                color={config.color}
                spreadOut={config.spreadOut}
                speed={config.speed}
            />
        </points>
    )
}

export default Fire
