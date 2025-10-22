import { useEffect, useState } from 'react'

import { useProgress } from '@react-three/drei'
import { RingLoader } from 'react-spinners'

type ModelLoaderProps = {
    children: React.ReactElement
    size?: number
    color?: string
}

function ModelLoader({ children, size, color }: ModelLoaderProps) {
    const { progress, active } = useProgress()
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (progress === 100 && !active && !isComplete) {
            const timer = setTimeout(() => {
                setIsComplete(true)
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [progress, active, isComplete])

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    zIndex: 100,
                    display: 'flex',
                    marginTop: '10px',
                    fontSize: '12px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <RingLoader size={size} color={color} loading={!isComplete} />
            </div>
            {children}
        </>
    )
}

export default ModelLoader
