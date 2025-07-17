import { useMemo } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Nature from './Nature.tsx'
import type { CameraSettingsType } from './types/types.ts'

function Experience() {
    const cameraSettings: CameraSettingsType = useMemo(
        () => ({
            fov: 30,
            position: [50, 40, 40]
        }),
        []
    )
    return (
        <>
            <Canvas camera={cameraSettings}>
                {/* Orbit Controls */}
                <OrbitControls enablePan={false} />

                {/*Scene*/}
                <Nature />
            </Canvas>
        </>
    )
}

export default Experience
