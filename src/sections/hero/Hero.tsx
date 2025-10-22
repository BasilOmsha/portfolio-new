import { Suspense, useRef } from 'react'

import { BeatLoader } from 'react-spinners'

import { AnimatedCounter } from '@/components/counter/AnimatedCounter.tsx'
import AdvancedLoader from '@/components/loaders/AdvancedLoader.tsx'
import Experience from '@/components/models/hero-experience/Experience.tsx'
import { words } from '@/constants'
import useHideModel from '@/hooks/useHideModel.ts'

import './hero.css'

function ModelWithLoader() {
    return (
        <>
            <AdvancedLoader />
            <Experience />
        </>
    )
}

function Hero() {
    const heroRef = useRef<HTMLElement>(null)
    const timeoutRef = useRef<number | null>(null)

    const isModelVisible = useHideModel(heroRef, timeoutRef)

    return (
        <>
            <section id="hero" className="hero_section" ref={heroRef}>
                <div className="hero_background"></div>

                <div className="hero_text">
                    <div className="profile-img-container">
                        <div className="square_small_profile_img">
                            <img
                                src="/images/hero/personal_pic.webp"
                                width="100%"
                                height="auto"
                                alt="Profile Image"
                            />
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
                        Hi, I am a developer based in Finland with a focus on creating clean,
                        efficient, and maintainable code.
                    </p>
                </div>

                {/* model section - conditionally rendered */}
                <div className="hero_model_section" style={{ position: 'relative' }}>
                    {isModelVisible ? (
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
                    ) : (
                        <div style={{ width: '100%', height: '100%' }} />
                    )}
                </div>
            </section>
            <AnimatedCounter />
        </>
    )
}

export default Hero
