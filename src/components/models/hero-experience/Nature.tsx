import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { button, useControls } from 'leva'
import * as THREE from 'three'

import { animateToOriginalValues } from '@/gsap/heroAnimation.ts'
import { PoleLightMaterial, PortalMaterial, TextMaterial } from './materials/materials.tsx'
import type { MaterialType, NatureTypes } from './types/types.ts'

extend({ PortalMaterial, PoleLightMaterial, TextMaterial })

function Nature({ orbitControl }: { orbitControl: boolean }) {
    /* Load the model*/
    const { nodes } = useGLTF('/models/nature-compressed.glb') as unknown as NatureTypes

    /*Load the textures*/
    const bakedTexture = useTexture('/textures/baked.webp')
    bakedTexture.flipY = false

    const portalMaterial = useRef<MaterialType>(new PortalMaterial())
    const poleLightMaterial = useRef<MaterialType>(new PoleLightMaterial())
    const textMaterial = useRef<MaterialType>(new TextMaterial())

    useFrame((_, delta) => {
        portalMaterial.current.uTime += delta * 2
        poleLightMaterial.current.uTime += delta * 0.6
    })

    const portalLightPosition = nodes.portalLight?.position || new THREE.Vector3(0, 0, 0)
    const portalLightRotation = nodes.portalLight?.rotation || new THREE.Euler(0, 0, 0)
    const portalLightScale = nodes.portalLight?.scale || new THREE.Vector3(1, 1, 1)

    const poleLightPosition = nodes.poleLightEmission?.position || new THREE.Vector3(0, 2, 0)
    const poleLightRotation = nodes.poleLightEmission?.rotation || new THREE.Euler(0, 0, 0)
    const poleLightScale = nodes.poleLightEmission?.scale || new THREE.Vector3(1, 1, 1)

    const bakedMeshPosition = nodes.baked7?.position || new THREE.Vector3(0, 0, 0)
    const bakedMeshRotation = nodes.baked7?.rotation || new THREE.Euler(0, 0, 0)

    const originalValues = {
        x: bakedMeshPosition.x,
        y: bakedMeshPosition.y,
        z: bakedMeshPosition.z,
        rotationX: bakedMeshRotation.x,
        rotationY: bakedMeshRotation.y,
        rotationZ: bakedMeshRotation.z
    }

    const [levaValues, setLevaValues] = useControls('Mesh Debug Controls', () => ({
        x: {
            value: originalValues.x,
            min: -10,
            max: 10,
            step: 0.01
        },
        y: {
            value: originalValues.y,
            min: -10,
            max: 10,
            step: 0.01
        },
        z: {
            value: originalValues.z,
            min: -10,
            max: 10,
            step: 0.01
        },
        rotationx: {
            value: originalValues.rotationX,
            min: -Math.PI,
            max: Math.PI,
            step: 0.01
        },
        rotationy: {
            value: originalValues.rotationY,
            min: -Math.PI,
            max: Math.PI,
            step: 0.01
        },
        rotationz: {
            value: originalValues.rotationZ,
            min: -Math.PI,
            max: Math.PI,
            step: 0.01
        },
        wireframe: {
            value: false
        },
        'Reset All': button(() => {
            animateToOriginalValues(levaValues, setLevaValues, originalValues, 1.5)
        })
    }))

    useGSAP(() => {
        if (!orbitControl) {
            animateToOriginalValues(levaValues, setLevaValues, originalValues, 1.5)
        }
    }, [orbitControl])

    return (
        <>
            {nodes.baked7 && nodes.baked7.geometry && (
                <mesh
                    geometry={nodes.baked7.geometry}
                    // position={nodes.baked7.position}
                    // rotation={nodes.baked7.rotation}
                    position={[levaValues.x, levaValues.y, levaValues.z]}
                    rotation={[levaValues.rotationx, levaValues.rotationy, levaValues.rotationz]}
                    scale={nodes.baked7.scale}
                >
                    <meshBasicMaterial
                        map={bakedTexture}
                        transparent={true}
                        opacity={1}
                        toneMapped={false}
                        wireframe={levaValues.wireframe}
                    />
                </mesh>
            )}

            {nodes.portalLight && nodes.portalLight.geometry && (
                <mesh
                    geometry={nodes.portalLight.geometry}
                    position={portalLightPosition}
                    rotation={portalLightRotation}
                    scale={portalLightScale}
                >
                    <primitive
                        object={portalMaterial.current}
                        attach="material"
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {nodes.poleLightEmission && nodes.poleLightEmission.geometry && (
                <mesh
                    geometry={nodes.poleLightEmission.geometry}
                    position={poleLightPosition}
                    rotation={poleLightRotation}
                    scale={poleLightScale}
                >
                    <primitive object={poleLightMaterial.current} attach="material" />
                </mesh>
            )}

            {[
                'BTextEmission',
                'ZTextEmission',
                'NTextEmission',
                'OTextEmission',
                'RuneEmission1',
                'RuneEmission2',
                'RuneEmission3'
            ].map((nodeName) => {
                const node = nodes[nodeName]
                if (node && typeof node === 'object' && 'geometry' in node && node.geometry) {
                    return (
                        <mesh
                            key={nodeName}
                            geometry={node.geometry}
                            position={node.position}
                            rotation={node.rotation}
                            scale={node.scale}
                        >
                            <primitive object={textMaterial.current} attach="material" />
                        </mesh>
                    )
                }
                return null
            })}
        </>
    )
}
export default Nature
useGLTF.preload('models/nature-compressed.glb')
