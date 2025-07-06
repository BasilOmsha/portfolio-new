import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import Experience from '@/components/models/hero-experience/Experience.tsx'
import { words } from '@/constants'

import styles from './hero.module.css'

function Hero() {
    const heroTextRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!heroTextRef.current) return

        const headings = heroTextRef.current.querySelectorAll('h1')
        gsap.fromTo(
            headings,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power2.inOut' }
        )
    }, [])

    return (
        <>
            <div className={styles.hero_layout}>
                <div ref={heroTextRef} id={styles.chars} className={styles.hero_text}>
                    <h1>
                        From curious
                        <span className={styles.slide}>
                            <span className={styles.wrapper}>
                                {words.map((word, index) => (
                                    <span key={index} className={styles.word_item}>
                                        <img
                                            src={word.imgPath || '/placeholder.svg'}
                                            alt={word.text || 'decorative icon'}
                                            className={styles.word_img}
                                        />
                                        <span>{word.text}</span>
                                    </span>
                                ))}
                            </span>
                        </span>
                    </h1>
                    <h1> to boss-level bugs,</h1>
                    <h1> I build projects and level</h1>
                    <h1> up with every line.</h1>
                    <p className={styles.hero_text_p}>
                        Hi, I'm Basil, a developer based in Finland with a passion for code.
                    </p>
                </div>
                {/* model section */}
                <div className={styles.hero_model_section}>
                    <Experience />
                </div>
                <div id={styles.words} className={styles.hero_text_right}>
                    <h1>Welcome to the Nature Experience</h1>
                    <p className={styles.hero_text_p}>
                        Explore the beauty of nature through this interactive 3D models.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Hero
