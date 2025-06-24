import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import Nature from './Nature.tsx'

type cameraSettingsType = {
    fov: number
    position: [number, number, number]
}

function Experience() {
    const cameraSettings: cameraSettingsType = useMemo(
        () => ({
            fov: 40,
            position: [50, 30, 40]
        }),
        []
    )
    return (
        <div className="hero_section">
            <div className="hero_text">
                <h1>Welcome to the Nature Experience</h1>
                <p>
                    Explore the beauty of nature through this interactive 3D
                    modelsdadsadadassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.
                </p>
            </div>
            <Canvas camera={cameraSettings} className="hero_model_section">
                {/* Orbit Controls */}
                <OrbitControls enablePan={false} />

                {/*Scene*/}
                <Nature />
            </Canvas>
        </div>
    )
}

export default Experience
