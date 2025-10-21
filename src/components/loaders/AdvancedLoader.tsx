import { useEffect, useState } from 'react'

import { useProgress } from '@react-three/drei'
import { BeatLoader } from 'react-spinners'

function AdvancedLoader() {
    const { progress, active, loaded, total } = useProgress()
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (progress === 100 && !active && !isComplete) {
            const timer = setTimeout(() => {
                setIsComplete(true)
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [progress, active, isComplete])

    if (isComplete) {
        return null
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 100,
                color: '#43c049',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                pointerEvents: 'none',
                padding: '20px'
            }}
        >
            <div>Loading 3D Experience</div>
            <div
                style={{
                    width: '200px',
                    height: '6px',
                    backgroundColor: 'rgba(67, 192, 73, 0.2)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    margin: '20px auto'
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#43c049',
                        borderRadius: '3px',
                        transition: 'width 0.3s ease'
                    }}
                />
            </div>
            <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.8 }}>
                {loaded} / {total} assets ({Math.round(progress)}%)
            </div>
            {active && (
                <div
                    style={{
                        display: 'flex',
                        marginTop: '10px',
                        fontSize: '12px',
                        opacity: 0.6,
                        justifyContent: 'center'
                    }}
                >
                    Decompressing models
                    <BeatLoader size={10} color="#045e01ff" />
                </div>
            )}
            {progress === 100 && (
                <div
                    style={{
                        display: 'flex',
                        marginTop: '10px',
                        fontSize: '12px',
                        opacity: 0.8,
                        color: '#43c049',
                        justifyContent: 'center'
                    }}
                >
                    <span>Finalizing </span>
                    <BeatLoader size={10} color="#045e01ff" />
                </div>
            )}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

export default AdvancedLoader
