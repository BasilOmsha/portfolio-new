import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import Experience from '@/components/models/hero-experience/Experience.tsx'

import { words } from '@/constants'
import './hero.css'

function Hero() {
    useGSAP(() => {
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
                    <h1>
                        From curious
                        <span className="slide">
                            <span className="wrapper">
                                {words.map((word, index) => (
                                    <span key={index} className="slide-span">
                                        <img
                                            src={word.imgPath || '/placeholder.svg'}
                                            alt="person"
                                            style={{
                                                width: '34px',
                                                height: '34px',
                                                backgroundColor: 'white',
                                                padding: '0.25rem',
                                                border: '1px solid #ccc',
                                                borderRadius: '9999px'
                                            }}
                                        />
                                        <span>{word.text}</span>
                                    </span>
                                ))}
                            </span>
                        </span>
                    </h1>
                    <h1> to boss-level bugs, I build</h1>
                    <h1> projects and level up</h1>
                    <h1> with every line</h1>
                    <p> Hi, I'm Basil, a developer based in Finland with a passion for code.</p>
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
