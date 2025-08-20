import { Suspense, useEffect, useState } from 'react'

import { useGSAP } from '@gsap/react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'

import { AnimatedCounter } from '@/components/counter/AnimatedCounter'
import Experience from '@/components/models/hero-experience/Experience.tsx'
import { words } from '@/constants'

import { BeatLoader } from 'react-spinners'
import './hero.css'

// Advanced Loader with Progress
function AdvancedLoader({ onLoadComplete }: { onLoadComplete?: () => void }) {
    const { progress, active, loaded, total } = useProgress()
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (progress === 100 && !active && !isComplete) {
            // Add a small delay to ensure everything is fully loaded
            const timer = setTimeout(() => {
                setIsComplete(true)
                onLoadComplete?.()
            }, 300) // 300ms delay after reaching 100%

            return () => clearTimeout(timer)

            // immediately set to complete
            // setIsComplete(true)
            // onLoadComplete?.()
        }
    }, [progress, active, isComplete, onLoadComplete])

    // Don't render anything if loading is complete
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
                // backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: '20px'
                // borderRadius: '10px',
                // border: '1px solid rgba(67, 192, 73, 0.3)'
            }}
        >
            {/* <div
                style={{
                    width: '50px',
                    height: '50px',
                    border: '3px solid rgba(67, 192, 73, 0.3)',
                    borderTop: '3px solid #43c049',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 20px'
                }}
            /> */}

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

// Model wrapper component to handle loading state
function ModelWithLoader() {
    const [showModel, setShowModel] = useState(false)

    const handleLoadComplete = () => {
        // Add a smooth transition when showing the model
        setTimeout(() => {
            setShowModel(true)
        }, 100)
    }

    return (
        <>
            <AdvancedLoader onLoadComplete={handleLoadComplete} />

            <Experience />
        </>
    )
}

function Hero() {
    useGSAP(() => {
        gsap.fromTo(
            '.square_small_profile_img',
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' }
        )
        gsap.fromTo(
            '.profile-img-container span',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.inOut' }
        )
        gsap.fromTo(
            '.hero_text h1',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power2.inOut' }
        )

        gsap.fromTo(
            '.hero_text p',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power2.inOut', delay: 0.5 }
        )

        // gsap.fromTo(
        //     '.hero_model_section',
        //     { x: 100, opacity: 0 },
        //     { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut', delay: 0.5 }
        // )
    })

    return (
        <>
            <section id="hero" className="hero_section">
                <div className="hero_background"></div>

                <div className="hero_text">
                    <div className="profile-img-container">
                        <div className="square_small_profile_img">
                            <img src="/images/hero/personal_pic.jpg" alt="Profile" />
                        </div>
                        <span style={{ fontFamily: 'cursive' }}>
                            by{' '}
                            <a
                                href="https://portfolio-lemon-sigma-13.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="author-link"
                            >
                                <strong>Basil Omsha</strong>
                            </a>
                        </span>
                    </div>

                    <h1 className="f-hero-h1">
                        <span style={{ marginRight: '0.5rem' }}> From curious</span>
                        <span className="slide">
                            <span className="wrapper">
                                {words.map((word, index) => (
                                    <span key={index} className="slide-span">
                                        <img
                                            src={word.imgPath || '/placeholder.svg'}
                                            alt="person"
                                        />
                                        <span>{word.text}</span>
                                    </span>
                                ))}
                            </span>
                        </span>
                    </h1>
                    <h1>to boss-level bugs, </h1>
                    <h1> I build projects and level up with every line</h1>

                    <p>
                        {' '}
                        Hi, I am a developer based in Finland with a focus on creating clean,
                        efficient, and maintainable code.
                    </p>
                </div>
                {/* model section */}
                <div className="hero_model_section" style={{ position: 'relative' }}>
                    <Suspense
                        fallback={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{ color: '#045e01ff' }}>Finalizing </span>
                                <BeatLoader size={10} color="#045e01ff" />
                            </div>
                        }
                    >
                        <ModelWithLoader />
                    </Suspense>
                </div>
            </section>
            <AnimatedCounter />
        </>
    )
}

export default Hero
