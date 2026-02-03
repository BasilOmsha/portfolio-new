import { useMemo, useRef } from 'react'

import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import sparksFragmentShader from '../../shaders/fire/fragment.glsl'
import sparksVertexShader from '../../shaders/fire/vertex.glsl'
import type { MaterialProps } from '../../types/types.ts'

const DEFAULT_SPEED = 6

function Material({ size, color, spreadOut = false, speed = DEFAULT_SPEED }: MaterialProps) {
    const BoneFireShader = useMemo(
        () =>
            shaderMaterial(
                {
                    uTime: 0,
                    uSize: size,
                    uSpeed: speed,
                    uColor: new THREE.Color(color),
                    uResolution: new THREE.Vector2(),
                    uIntensity: 1.3,
                    uSpreadOut: spreadOut ? 1.0 : 0.0
                },
                sparksVertexShader,
                sparksFragmentShader
            ),
        [size, color, spreadOut, speed]
    )

    const materialRef = useRef<THREE.ShaderMaterial>(null)

    return (
        <primitive
            object={new BoneFireShader()}
            ref={materialRef}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors={true}
            toneMapped={true}
            transparent={true}
            opacity={0.9}
        />
    )
}

export default Material
