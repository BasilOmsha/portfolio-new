import { useGSAP } from '@gsap/react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { PerspectiveCamera } from 'three'

import type {
    LevaValues,
    OriginalValues,
    SetLevaValues
} from '@/components/models/hero-experience/types/types.ts'

export function CameraAnimator({ isOrbitEnabled }: { isOrbitEnabled: boolean }) {
    const { camera } = useThree()

    useGSAP(() => {
        if (!(camera instanceof PerspectiveCamera)) return

        if (isOrbitEnabled) {
            gsap.to(camera, {
                fov: 22,
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => camera.updateProjectionMatrix()
            })

            gsap.to(camera.position, {
                x: 45,
                y: 40,
                z: 35,
                duration: 1.5,
                ease: 'power2.inOut'
            })
        } else {
            // Animate back to default state: fov: 25, position: [50, 40, 35]
            gsap.to(camera, {
                fov: 25,
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => camera.updateProjectionMatrix()
            })

            gsap.to(camera.position, {
                x: 50,
                y: 40,
                z: 35,
                duration: 1.5,
                ease: 'power2.inOut'
            })
        }
    }, [camera, isOrbitEnabled])

    return null
}
export function animateToOriginalValues(
    levaValues: LevaValues,
    setLevaValues: SetLevaValues,
    originalValues: OriginalValues,
    duration: number
): void {
    gsap.to(levaValues, {
        x: originalValues.x,
        y: originalValues.y,
        z: originalValues.z,
        rotationx: originalValues.rotationX,
        rotationy: originalValues.rotationY,
        rotationz: originalValues.rotationZ,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
            setLevaValues({
                x: levaValues.x,
                y: levaValues.y,
                z: levaValues.z,
                rotationx: levaValues.rotationx,
                rotationy: levaValues.rotationy,
                rotationz: levaValues.rotationz,
                wireframe: false
            })
        }
    })
}
