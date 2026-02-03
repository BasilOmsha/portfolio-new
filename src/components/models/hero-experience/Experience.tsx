import { useEffect, useMemo, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Leva } from 'leva'

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
    luminanceThreshold: 0.85,
    luminanceSmoothing: 0.5,
    intensity: 0.4,
    width: 256,
    height: 256
}

function PostEffect() {
    const { size } = useThree()

    if (size.width > 1400) return null
    return (
        <EffectComposer multisampling={0}>
            <Bloom {...BLOOM_CONFIG} />
        </EffectComposer>
    )
}

function Experience({ isModelInView }: { isModelInView: boolean }) {
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false)
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    )

    const isActive = isModelInView && isOrbitEnabled

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

    const levaPosition = useMemo(() => {
        if (windowWidth <= 500) {
            return { x: 10, y: 50 }
        }
        if (windowWidth <= 800) {
            return { x: 10, y: 50 }
        }
        return { x: 0, y: 50 }
    }, [windowWidth])

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

    return (
        <>
            <Leva
                hidden={!isActive}
                collapsed
                theme={getLevaTheme()}
                titleBar={{
                    position: levaPosition
                }}
            />
            <Canvas
                camera={CAMERA_SETTINGS}
                frameloop="always"
                style={{
                    pointerEvents: isOrbitEnabled ? 'auto' : 'none',
                    touchAction: isOrbitEnabled ? 'none' : 'pan-y'
                }}
                dpr={Math.min(window.devicePixelRatio, 1.5)}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true
                }}
                resize={{ scroll: false, debounce: 150 }}
            >
                <CameraAnimator isOrbitEnabled={isActive} />
                <OrbitControls {...orbitControlsConfig} />

                {/*Scene*/}
                {isActive && <Fire />}
                <Nature orbitControl={isActive} />
                <PostEffect />
            </Canvas>
            <ExperienceButton onButtonToggle={handleButtonToggle} />
        </>
    )
}

export default Experience
