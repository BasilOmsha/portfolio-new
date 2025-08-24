import { useEffect, useRef } from 'react'

import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import type { TechStackIcon } from '@/constants'

type TechIconCardExperienceProps = {
    model: TechStackIcon
}

function TechIconCardExperience({ model }: TechIconCardExperienceProps): React.ReactElement {
    const scene = useGLTF(model.modelPath)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (model.name === 'Interactive - Three.js') {
            scene.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.name === 'Object_5') {
                        child.material = new THREE.MeshStandardMaterial({ color: 'white' })
                    }
                }
            })
        }
    }, [model.name, scene])
    // Normalize scale to avoid TypeScript errors
    const normalizedScale: [number, number, number] = (() => {
        if (typeof model.scale === 'number') {
            return [model.scale, model.scale, model.scale]
        } else if (Array.isArray(model.scale) && model.scale.length === 3) {
            return model.scale
        } else {
            return [1, 1, 1]
        }
    })()

    const rotation: [number, number, number] = model.rotation || [0, 0, 0]

    return (
        <Canvas ref={canvasRef}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
            <Environment preset="city" />
            <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
                <group scale={normalizedScale} rotation={rotation}>
                    <primitive object={scene.scene} />
                </group>
            </Float>
            <OrbitControls enabled={false} enableZoom={false} enablePan={false} makeDefault />
        </Canvas>
    )
}

export default TechIconCardExperience
