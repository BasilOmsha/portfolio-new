import { Html, shaderMaterial, useGLTF, useTexture } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"

import { button, useControls } from "leva"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import poleLightFragmentShader from "./shaders/pole-light/fragment.glsl"
import poleLightVertexShader from "./shaders/pole-light/vertex.glsl"
import portalFragmentShader from "./shaders/portal/fragment.glsl"
import portalVertexShader from "./shaders/portal/vertex.glsl"
import textFragmentShader from "./shaders/text/fragment.glsl"
import textVertexShader from "./shaders/text/vertex.glsl"

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#ffffff"),
        uColorEnd: new THREE.Color("#75ba4f")
    },
    portalVertexShader,
    portalFragmentShader
)

const TextMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#00f0f6"),
        uColorEnd: new THREE.Color("#00f0f6"),
        uIntensity: 8.0
    },
    textVertexShader,
    textFragmentShader
)

const PoleLightMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#ffb07a"),
        uColorEnd: new THREE.Color("#ffb07a"),
        uIntensity: 5.0,
        uFlickerSpeed: 1.0
    },
    poleLightVertexShader,
    poleLightFragmentShader
)

extend({ PortalMaterial, TextMaterial, PoleLightMaterial })

function Nature({ onZoomToTargetRequest, isActive, resetTrigger, cameraProps, setCameraProps }) {
    const { nodes } = useGLTF("/models/nature9.glb")
    console.log("Loaded Nature model nodes:", nodes)
    const bakedTexture = useTexture("/images/textures/baked19.jpg")
    bakedTexture.flipY = false // Fixes the texture flipping issue

    const portalMaterial = useRef(new PortalMaterial())
    const letterMaterial = useRef(new TextMaterial())
    const poleLightMaterial = useRef(new PoleLightMaterial())
    const meshRef = useRef()

    // Store original values
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

    // Camera original values
    const originalCameraValues = {
        positionX: 3,
        positionY: 30,
        positionZ: 40,
        fov: 30,
        orbitTargetX: 0,
        orbitTargetY: 0,
        orbitTargetZ: 0
    }

    // Use a ref to track if we should skip the useFrame update
    const skipFrameUpdate = useRef(false)

    const [levaValues, setLevaValues] = useControls("Mesh Debug Controls", () => ({
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
        "Reset All": button(() => {
            setLevaValues({
                x: originalValues.x,
                y: originalValues.y,
                z: originalValues.z,
                rotationx: originalValues.rotationX,
                rotationy: originalValues.rotationY,
                rotationz: originalValues.rotationZ,
                wireframe: false
            })
        })
    }))

    // Camera Controls with Leva
    const [cameraLevaValues, setCameraLevaValues] = useControls("Camera Controls", () => ({
        positionX: {
            value: cameraProps?.position?.[0] || originalCameraValues.positionX,
            min: -50,
            max: 50,
            step: 0.1
        },
        positionY: {
            value: cameraProps?.position?.[1] || originalCameraValues.positionY,
            min: 0,
            max: 100,
            step: 0.1
        },
        positionZ: {
            value: cameraProps?.position?.[2] || originalCameraValues.positionZ,
            min: -50,
            max: 50,
            step: 0.1
        },
        fov: {
            value: cameraProps?.fov || originalCameraValues.fov,
            min: 0,
            max: 80,
            step: 1
        },
        orbitTargetX: {
            value: cameraProps?.orbitTarget?.[0] || originalCameraValues.orbitTargetX,
            min: -20,
            max: 20,
            step: 0.1
        },
        orbitTargetY: {
            value: cameraProps?.orbitTarget?.[1] || originalCameraValues.orbitTargetY,
            min: -20,
            max: 20,
            step: 0.1
        },
        orbitTargetZ: {
            value: cameraProps?.orbitTarget?.[2] || originalCameraValues.orbitTargetZ,
            min: -20,
            max: 20,
            step: 0.1
        },
        "Reset Camera": button(() => {
            setCameraProps({
                position: [
                    originalCameraValues.positionX,
                    originalCameraValues.positionY,
                    originalCameraValues.positionZ
                ],
                fov: originalCameraValues.fov,
                orbitTarget: [
                    originalCameraValues.orbitTargetX,
                    originalCameraValues.orbitTargetY,
                    originalCameraValues.orbitTargetZ
                ]
            })
            setCameraLevaValues({
                positionX: originalCameraValues.positionX,
                positionY: originalCameraValues.positionY,
                positionZ: originalCameraValues.positionZ,
                fov: originalCameraValues.fov,
                orbitTargetX: originalCameraValues.orbitTargetX,
                orbitTargetY: originalCameraValues.orbitTargetY,
                orbitTargetZ: originalCameraValues.orbitTargetZ
            })
        }),
        "Zoom to Pole Light": button(() => {
            const poleLightPosition =
                nodes.poleLightEmission?.position || new THREE.Vector3(0, 2, 0)
            const targetPosition = new THREE.Vector3(
                poleLightPosition.x,
                poleLightPosition.y + 2,
                poleLightPosition.z
            )
            const fixedOffset = new THREE.Vector3(25, 4, 5)
            const zoomDistance = 8
            const newCameraPosition = new THREE.Vector3().addVectors(
                targetPosition,
                fixedOffset.normalize().multiplyScalar(zoomDistance)
            )

            setCameraProps({
                position: [newCameraPosition.x, newCameraPosition.y, newCameraPosition.z],
                fov: 15,
                orbitTarget: [targetPosition.x, targetPosition.y, targetPosition.z]
            })
        }),
        "Zoom to Rune 1": button(() => {
            const runePosition = nodes.RuneEmission1?.position || new THREE.Vector3(0, 0, 0)
            const targetPosition = new THREE.Vector3(
                runePosition.x,
                runePosition.y + 2,
                runePosition.z
            )
            const fixedOffset = new THREE.Vector3(5, 4, -2)
            const zoomDistance = 8
            const newCameraPosition = new THREE.Vector3().addVectors(
                targetPosition,
                fixedOffset.normalize().multiplyScalar(zoomDistance)
            )

            setCameraProps({
                position: [newCameraPosition.x, newCameraPosition.y, newCameraPosition.z],
                fov: 15,
                orbitTarget: [targetPosition.x, targetPosition.y, targetPosition.z]
            })
        })
    }))

    // Update camera when Leva values change
    useEffect(() => {
        if (setCameraProps && isActive) {
            setCameraProps({
                position: [
                    cameraLevaValues.positionX,
                    cameraLevaValues.positionY,
                    cameraLevaValues.positionZ
                ],
                fov: cameraLevaValues.fov,
                orbitTarget: [
                    cameraLevaValues.orbitTargetX,
                    cameraLevaValues.orbitTargetY,
                    cameraLevaValues.orbitTargetZ
                ]
            })
        }
    }, [cameraLevaValues, setCameraProps, isActive])

    // Update Leva values when camera props change externally
    useEffect(() => {
        if (cameraProps) {
            const newValues = {
                positionX: cameraProps.position?.[0] ?? cameraLevaValues.positionX,
                positionY: cameraProps.position?.[1] ?? cameraLevaValues.positionY,
                positionZ: cameraProps.position?.[2] ?? cameraLevaValues.positionZ,
                fov: cameraProps.fov ?? cameraLevaValues.fov,
                orbitTargetX: cameraProps.orbitTarget?.[0] ?? cameraLevaValues.orbitTargetX,
                orbitTargetY: cameraProps.orbitTarget?.[1] ?? cameraLevaValues.orbitTargetY,
                orbitTargetZ: cameraProps.orbitTarget?.[2] ?? cameraLevaValues.orbitTargetZ
            }
            setCameraLevaValues(newValues)
        }
    }, [
        cameraLevaValues.fov,
        cameraLevaValues.orbitTargetX,
        cameraLevaValues.orbitTargetY,
        cameraLevaValues.orbitTargetZ,
        cameraLevaValues.positionX,
        cameraLevaValues.positionY,
        cameraLevaValues.positionZ,
        cameraProps,
        setCameraLevaValues
    ])

    // Reset Leva values when resetTrigger changes
    useEffect(() => {
        if (resetTrigger > 0) {
            setLevaValues({
                x: originalValues.x,
                y: originalValues.y,
                z: originalValues.z,
                rotationx: originalValues.rotationX,
                rotationy: originalValues.rotationY,
                rotationz: originalValues.rotationZ,
                wireframe: false
            })
        }
    }, [
        originalValues.rotationX,
        originalValues.rotationY,
        originalValues.rotationZ,
        originalValues.x,
        originalValues.y,
        originalValues.z,
        resetTrigger,
        setLevaValues
    ])

    // Track previous leva values to detect manual changes
    const prevLevaValues = useRef(levaValues)

    useEffect(() => {
        // Check if leva values changed (manual input)
        const levaChanged =
            prevLevaValues.current.x !== levaValues.x ||
            prevLevaValues.current.y !== levaValues.y ||
            prevLevaValues.current.z !== levaValues.z ||
            prevLevaValues.current.rotationx !== levaValues.rotationx ||
            prevLevaValues.current.rotationy !== levaValues.rotationy ||
            prevLevaValues.current.rotationz !== levaValues.rotationz

        if (levaChanged) {
            // Leva values changed manually, skip frame updates temporarily
            skipFrameUpdate.current = true
            setTimeout(() => {
                skipFrameUpdate.current = false
            }, 100) // Skip for 100ms to prevent conflicts
        }

        prevLevaValues.current = levaValues
    }, [levaValues])

    // Only update Leva from mesh position when not manually editing Leva
    useFrame(() => {
        if (meshRef.current && isActive && !skipFrameUpdate.current) {
            const currentPosition = meshRef.current.position
            const currentRotation = meshRef.current.rotation

            // Only update if values have changed significantly
            const threshold = 0.001
            if (
                Math.abs(currentPosition.x - levaValues.x) > threshold ||
                Math.abs(currentPosition.y - levaValues.y) > threshold ||
                Math.abs(currentPosition.z - levaValues.z) > threshold ||
                Math.abs(currentRotation.x - levaValues.rotationx) > threshold ||
                Math.abs(currentRotation.y - levaValues.rotationy) > threshold ||
                Math.abs(currentRotation.z - levaValues.rotationz) > threshold
            ) {
                setLevaValues({
                    x: currentPosition.x,
                    y: currentPosition.y,
                    z: currentPosition.z,
                    rotationx: currentRotation.x,
                    rotationy: currentRotation.y,
                    rotationz: currentRotation.z
                })
            }
        }
    })

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta * 2
        poleLightMaterial.current.uTime += delta * 0.6
    })

    const handleZoom = (position, targetType) => {
        if (!isActive) return
        if (!position) {
            console.warn("Position is null or undefined.")
            return
        }

        const targetPosition = new THREE.Vector3(
            position.x,
            position.y + 2, // HTML element's Y offset
            position.z
        )

        // Call the callback prop to request zoom from parent
        if (onZoomToTargetRequest) {
            const desiredFov = 15 // Example FOV for zoomed-in view
            const zoomDistance = 8 // Desired distance from camera to target

            onZoomToTargetRequest(targetPosition, zoomDistance, desiredFov, targetType)
        }
    }

    if (!nodes || !nodes.baked7 || !nodes.poleLightEmission || !nodes.portalLight) {
        console.warn("Required model nodes are missing. Scene may not render correctly.")
    }

    const poleLightPosition = nodes.poleLightEmission?.position || new THREE.Vector3(0, 2, 0)
    const poleLightRotation = nodes.poleLightEmission?.rotation || new THREE.Euler(0, 0, 0)
    const poleLightScale = nodes.poleLightEmission?.scale || new THREE.Vector3(1, 1, 1)

    const portalLightPosition = nodes.portalLight?.position || new THREE.Vector3(0, 0, 0)
    const portalLightRotation = nodes.portalLight?.rotation || new THREE.Euler(0, 0, 0)
    const portalLightScale = nodes.portalLight?.scale || new THREE.Vector3(1, 1, 1)

    const runeLight1Position = nodes.RuneEmission1?.position || new THREE.Vector3(0, 0, 0)
    const runeLight1Rotation = nodes.RuneEmission1?.rotation || new THREE.Euler(0, 0, 0)
    const runeLight1Scale = nodes.RuneEmission1?.scale || new THREE.Vector3(1, 1, 1)

    return (
        <>
            {nodes.baked7 && nodes.baked7.geometry && (
                <mesh
                    ref={meshRef}
                    geometry={nodes.baked7.geometry}
                    position={[levaValues.x, levaValues.y, levaValues.z]}
                    rotation={[levaValues.rotationx, levaValues.rotationy, levaValues.rotationz]}
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

            {[
                "BTextEmission",
                "ZTextEmission",
                "NTextEmission",
                "OTextEmission",
                "RuneEmission1",
                "RuneEmission2",
                "RuneEmission3"
            ].map((nodeName) => {
                const node = nodes[nodeName]
                if (node && node.geometry) {
                    return (
                        <mesh
                            key={nodeName}
                            geometry={node.geometry}
                            position={node.position}
                            rotation={node.rotation}
                            scale={node.scale}
                        >
                            <primitive object={letterMaterial.current} attach="material" />
                        </mesh>
                    )
                }
                return null
            })}

            {nodes.RuneEmission1 && (
                <Html
                    occlude
                    position={[
                        runeLight1Position.x,
                        runeLight1Position.y + 2,
                        runeLight1Position.z
                    ]}
                    rotation={runeLight1Rotation}
                    transform
                    distanceFactor={5.6}
                >
                    <div
                        onClick={() => handleZoom(runeLight1Position, "run1")}
                        style={{
                            backgroundColor: "rgba(255, 176, 122, 0.9)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            color: "black",
                            fontSize: "0.8rem",
                            cursor: isActive ? "pointer" : "default"
                        }}
                    >
                        Experience Rune 1
                    </div>
                </Html>
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

            {/* Pole light HTML */}
            {nodes.poleLightEmission && (
                <Html
                    occlude
                    position={[poleLightPosition.x, poleLightPosition.y + 2, poleLightPosition.z]}
                    rotation={poleLightRotation}
                    transform
                    distanceFactor={5.6}
                >
                    <div
                        onClick={() => handleZoom(poleLightPosition, "poleLight")}
                        style={{
                            backgroundColor: "rgba(255, 176, 122, 0.9)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            color: "black",
                            fontSize: "0.8rem",
                            cursor: isActive ? "pointer" : "default"
                        }}
                    >
                        Light Source
                    </div>
                </Html>
            )}
        </>
    )
}

export default Nature
useGLTF.preload("/models/nature9.glb")
