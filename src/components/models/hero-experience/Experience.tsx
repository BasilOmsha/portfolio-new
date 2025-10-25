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

const CAMERA_SETTINGS: CameraSettingsType = {
    fov: 25,
    position: [50, 40, 35]
}

const BLOOM_CONFIG = {
    mipmapBlur: false,
    luminanceThreshold: 0.8,
    luminanceSmoothing: 0.5,
    intensity: 0.5,
    width: 256,
    height: 256
}

function Experience() {
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false)
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    )
    const [frameloopMode, setFrameloopMode] = useState<'always' | 'demand' | 'never'>('demand')

    const orbitControlsConfig = useMemo(
        () => ({
            enablePan: false,
            minDistance: 5,
            maxDistance: 100,
            enableZoom: isOrbitEnabled,
            enableRotate: isOrbitEnabled,
            // minPolarAngle: Math.PI / 2,
            maxPolarAngle: 1.85,
            minAzimuthAngle: -0.01,
            maxAzimuthAngle: 1.45
        }),
        [isOrbitEnabled]
    )

    const getLevaTheme = () => {
        const baseColors = {
            accent1: '#43c049ff',
            accent2: '#138d08ff',
            elevation1: '#0516afff',
            elevation2: '#585858ff',
            elevation3: '#1a1a1a'
        }

        if (windowWidth <= 500) {
            return {
                sizes: { rootWidth: '180px', controlWidth: '100px' },
                colors: baseColors
            }
        }
        if (windowWidth <= 800) {
            return {
                sizes: { rootWidth: '220px', controlWidth: '140px' },
                colors: baseColors
            }
        }
        return {
            sizes: { rootWidth: '280px', controlWidth: '160px' },
            colors: baseColors
        }
    }

    const getLevaPosition = () => {
        if (windowWidth <= 500) {
            return { x: 10, y: 50 }
        }
        if (windowWidth <= 800) {
            return { x: 10, y: 50 }
        }
        return { x: 0, y: 50 }
    }

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

    // Handle frameloop mode with delay when switching to demand
    useEffect(() => {
        if (isOrbitEnabled) {
            setFrameloopMode('always')
        } else {
            const timer = setTimeout(() => {
                setFrameloopMode('demand')
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [isOrbitEnabled])

    return (
        <>
            <Leva
                hidden={!isOrbitEnabled}
                collapsed
                theme={getLevaTheme()}
                titleBar={{
                    position: getLevaPosition()
                }}
            />
            <Canvas
                camera={CAMERA_SETTINGS}
                style={{
                    pointerEvents: isOrbitEnabled ? 'auto' : 'none',
                    touchAction: isOrbitEnabled ? 'none' : 'pan-y'
                }}
                resize={{ scroll: false }}
                frameloop={frameloopMode}
            >
                <CameraAnimator isOrbitEnabled={isOrbitEnabled} />
                <OrbitControls {...orbitControlsConfig} />

                {/*Scene*/}
                {isOrbitEnabled && <Fire />}
                <Nature orbitControl={isOrbitEnabled} />
                <EffectComposer>
                    <Bloom {...BLOOM_CONFIG} />
                    <ToneMapping blendFunction={BlendFunction.DARKEN} />
                </EffectComposer>
            </Canvas>
            <ExperienceButton onButtonToggle={handleButtonToggle} />
        </>
    )
}

export default Experience
