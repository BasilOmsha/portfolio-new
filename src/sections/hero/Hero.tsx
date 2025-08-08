import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import Experience from '@/components/models/hero-experience/Experience.tsx'

import { words } from '@/constants'
import './hero.css'

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
                            by <strong>Basil Omsha</strong>
                        </span>
                    </div>
                    <h1>
                        From
                        <h1 className="f-hero-h1">
                            <h1 style={{ marginRight: '0.5rem' }}>curious</h1>
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
                        to boss-level bugs, I build projects and level up with every line
                    </h1>

                    <p>
                        {' '}
                        Hi, I am a developer based in Finland with a focus on creating clean,
                        efficient, and maintainable code.
                    </p>
                </div>
                {/* model section */}
                <div className="hero_model_section">
                    <Experience />
                </div>
            </section>
        </>
    )
}

export default Hero
