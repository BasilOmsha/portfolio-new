import { useMemo } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { expandHeroModelSection } from '@/gsap/heroAnimation.ts'
import Nature from './Nature.tsx'
import type { CameraSettingsType } from './types/types.ts'

import styles from '../../../sections/hero/hero.module.css'

function Experience() {
    const animate = () => {
        expandHeroModelSection(styles)
    }

    const cameraSettings: CameraSettingsType = useMemo(
        () => ({
            fov: 25,
            position: [60, 35, 40]
        }),
        []
    )
    return (
        <>
            <Canvas
                camera={cameraSettings}
                style={{
                    backgroundColor: 'transparent'
                }}
            >
                {/* Orbit Controls */}
                <OrbitControls enablePan={true} />

                {/*Scene*/}
                <Nature />
            </Canvas>
            <button className={styles.hero_model_section_button} onClick={animate}>
                test
            </button>
        </>
    )
}

export default Experience
