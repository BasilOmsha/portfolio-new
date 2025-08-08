import { useMemo } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import ExperienceButton from './ExperienceButton.tsx'
import Nature from './Nature.tsx'
import type { CameraSettingsType } from './types/types.ts'

function Experience() {
    const cameraSettings: CameraSettingsType = useMemo(
        () => ({
            fov: 22,
            position: [45, 40, 35]
        }),
        []
    )
    return (
        <>
            <Canvas camera={cameraSettings}>
                {/* Orbit Controls */}
                <OrbitControls
                    enablePan={false}
                    minDistance={5} // Closest zoom
                    maxDistance={100} // Farthest zoom
                    enableZoom={true} // Allow mouse wheel zoom
                />

                {/*Scene*/}
                <Nature />
            </Canvas>
            <ExperienceButton />
        </>
    )
}

export default Experience
