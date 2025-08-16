import { useEffect, useMemo, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { Leva } from 'leva'
import { BlendFunction } from 'postprocessing'

import { CameraAnimator } from '@/gsap/heroAnimation.ts'
import Fire from './boneFire/Fire.tsx'
import ExperienceButton from './ExperienceButton.tsx'
import Nature from './Nature.tsx'
import type { CameraSettingsType } from './types/types.ts'

function Experience() {
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false)
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    )

    const cameraSettings: CameraSettingsType = useMemo(
        () => ({
            fov: 25,
            position: [50, 40, 35]
        }),
        []
    )

    // Track window width for responsive positioning
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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

    // Calculate Leva position based on screen width
    const getLevaPosition = () => {
        if (windowWidth <= 500) {
            return { x: 0, y: -50 }
        }
        if (windowWidth <= 800) {
            return { x: 0, y: -50 }
        }
        return { x: 0, y: 50 }
    }
    // set position once
    const [initialPosition] = useState(() => getLevaPosition())

    // Calculate Leva theme based on screen width
    const getLevaTheme = () => {
        if (windowWidth <= 500) {
            return {
                sizes: {
                    rootWidth: '200px',
                    controlWidth: '120px'
                },
                colors: {
                    accent1: '#43c049ff',
                    accent2: '#138d08ff',
                    elevation1: '#0516afff',
                    elevation2: '#585858ff',
                    elevation3: '#1a1a1a'
                }
            }
        }
        return {
            sizes: {
                rootWidth: '280px',
                controlWidth: '160px'
            },
            colors: {
                accent1: '#43c049ff',
                accent2: '#138d08ff',
                elevation1: '#0516afff',
                elevation2: '#585858ff',
                elevation3: '#1a1a1a'
            }
        }
    }

    return (
        <>
            <Leva
                hidden={!isOrbitEnabled}
                collapsed
                theme={getLevaTheme()}
                titleBar={{
                    position: initialPosition
                }}
            />
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
                <Nature orbitControl={isOrbitEnabled} />
                <EffectComposer>
                    <Bloom
                        mipmapBlur
                        luminanceThreshold={0.8}
                        luminanceSmoothing={0.5}
                        intensity={0.5}
                        width={256}
                        height={256}
                    />
                    <ToneMapping blendFunction={BlendFunction.DARKEN} />
                </EffectComposer>
            </Canvas>
            <ExperienceButton onButtonToggle={handleButtonToggle} />
        </>
    )
}

export default Experience
