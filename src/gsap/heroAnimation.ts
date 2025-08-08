import { useGSAP } from '@gsap/react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { PerspectiveCamera } from 'three'

export default function CameraAnimator({ isOrbitEnabled }: { isOrbitEnabled: boolean }) {
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
