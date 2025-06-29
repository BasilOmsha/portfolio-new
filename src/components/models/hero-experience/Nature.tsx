import { useGLTF, useTexture } from '@react-three/drei'

import type { NatureTypes } from './types/types.ts'

function Nature() {

    /* Load the model*/
    const { nodes } = useGLTF('/models/nature.glb') as unknown as NatureTypes

    /*Load the textures*/
    const bakedTexture = useTexture('/textures/baked.jpg')
    bakedTexture.flipY = false

    return (
        <>
            <mesh
                geometry={nodes.baked7.geometry}
                position={nodes.baked7.position}
                rotation={nodes.baked7.rotation}
                scale={nodes.baked7.scale}
            >
                <meshBasicMaterial
                    map={bakedTexture}
                    transparent={true}
                    opacity={1}
                    toneMapped={true}
                    wireframe={false}
                />
            </mesh>
        </>
    )
}
export default Nature
useGLTF.preload('/nature.glb')
