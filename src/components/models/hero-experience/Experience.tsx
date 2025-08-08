import { useMemo, useState } from 'react'

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

    const cameraSettings: CameraSettingsType = useMemo(
        () => ({
            fov: 25,
            position: [50, 40, 35]
        }),
        []
    )

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
