import { useEffect, useMemo, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import CameraAnimator from '@/gsap/heroAnimation.ts'
import Fire from './boneFire/Fire.tsx'
import ExperienceButton from './ExperienceButton.tsx'
import Nature from './Nature.tsx'
import type { CameraSettingsType } from './types/types.ts'

function Experience() {
    const [isOrbitEnabled, setIsOrbitEnabled] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const cameraSettings: CameraSettingsType = useMemo(
        () => ({
            fov: 25,
            position: [50, 40, 35]
        }),
        []
    )

    // Set cursor style based on orbit state
    useEffect(() => {
        const canvas = document.querySelector('canvas')
        const heroSection = document.querySelector('.hero_model_section') as HTMLElement
        const targetElement = heroSection || canvas

        if (targetElement && isOrbitEnabled) {
            // Set grab cursor when orbit is enabled
            targetElement.style.cursor = isMouseDown ? 'grabbing' : 'grab'

            const handleMouseDown = () => setIsMouseDown(true)
            const handleMouseUp = () => setIsMouseDown(false)

            targetElement.addEventListener('mousedown', handleMouseDown)
            document.addEventListener('mouseup', handleMouseUp)

            return () => {
                targetElement.removeEventListener('mousedown', handleMouseDown)
                document.removeEventListener('mouseup', handleMouseUp)
                targetElement.style.cursor = 'default' // Reset cursor
            }
        } else if (targetElement) {
            // Reset cursor when orbit is disabled
            targetElement.style.cursor = 'default'
        }
    }, [isOrbitEnabled, isMouseDown])

    const handleButtonToggle = (enabled: boolean) => {
        setIsOrbitEnabled(enabled)
    }
    return (
        <>
            <Canvas camera={cameraSettings}>
                <CameraAnimator isOrbitEnabled={isOrbitEnabled} />
                <OrbitControls
                    enablePan={false} // Panning is for moving the camera around the scene
                    minDistance={5}
                    maxDistance={100}
                    enableZoom={isOrbitEnabled}
                    enableRotate={isOrbitEnabled}
                />

                {/*Scene*/}
                <Fire />
                <Nature />
                <EffectComposer>
                    <Bloom
                        mipmapBlur
                        luminanceThreshold={1}
                        luminanceSmoothing={1}
                        intensity={1.5}
                    />
                    <ToneMapping blendFunction={BlendFunction.DARKEN} />
                </EffectComposer>
            </Canvas>
            <ExperienceButton onButtonToggle={handleButtonToggle} />
        </>
    )
}

export default Experience
