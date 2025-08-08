import { useMemo } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import Fire from './boneFire/Fire.tsx'
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
            <ExperienceButton />
        </>
    )
}

export default Experience
