import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import GlowCard from '@/components/glow-card/GlowCard'
import TitleHeader from '@/components/title-header/TitleHeader.js'
import { expCards } from '@/constants'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

function Experience() {
    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set(['.timeline-card', '.timeline', '.expText'], {
                willChange: 'transform',
                transform: 'translate3d(0,0,0)'
            })
            gsap.utils.toArray('.timeline-card').forEach((card) => {
                gsap.from(card as Element, {
                    xPercent: -100,
                    opacity: 0,
                    transformOrigin: 'left left',
                    duration: 1,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: card as Element,
                        start: 'top 80%',
                        onLeave: () => {
                            gsap.set(card as Element, { willChange: 'auto' })
                        }
                    }
                })
            })

            gsap.to('.timeline', {
                transformOrigin: 'bottom bottom',
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top center',
                    end: '97% center',
                    // Update the animation as the user scrolls
                    onUpdate: (self) => {
                        gsap.to('.timeline', {
                            scaleY: 1 - self.progress
                        })
                    },
                    onLeave: () => {
                        // Remove will-change after animation
                        gsap.set('.timeline' as unknown as Element, { willChange: 'auto' })
                    }
                }
            })

            gsap.utils.toArray('.expText').forEach((text) => {
                gsap.from(text as Element, {
                    opacity: 0,
                    xPercent: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: text as Element,
                        start: 'top 60%',
                        onLeave: () => {
                            gsap.set(text as Element, { willChange: 'auto' })
                        }
                    }
                })
            }, '<') // position parameter - insert at the start of the animation
        })
        // Clean up ScrollTrigger instances
        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" className="experience-section">
            <div className="experience-container">
                {/* <TitleHeader title="My Work Experience" sub="💼 Career Overview" /> */}
                <TitleHeader title="My Tech Journey" />
                <div className="experience-content">
                    <div className="experience-cards-container">
                        {/* {expCards.map((card, index) => ( */}
                        {expCards.map((card, index) => (
                            <div key={`${card.title}-${card.date}`} className="exp-card-wrapper">
                                <div className="card-section">
                                    {card.showGlowCard ? (
                                        <GlowCard card={card} index={index}>
                                            <div>
                                                {/* <img src={card.imgPath} alt="exp-img" /> */}
                                            </div>
                                        </GlowCard>
                                    ) : null}
                                </div>
                                <div className="content-section">
                                    <div className="content-wrapper">
                                        <div className="timeline-wrapper">
                                            <div className="timeline" />
                                            <div className="gradient-line" />
                                        </div>
                                        <div className="expText exp-text">
                                            <div className="timeline-logo">
                                                <img
                                                    src={card.logoPath}
                                                    width={card.imgWidth}
                                                    height={card.imgHeight}
                                                    alt="logo"
                                                />
                                            </div>
                                            <div>
                                                <h1 className="exp-title">{card.title}</h1>
                                                <p className="exp-date">{card.company}</p>
                                                <p className="exp-date">🗓️&nbsp;{card.date}</p>
                                                {card.date2 && (
                                                    <p className="exp-date">🗓️&nbsp;{card.date2}</p>
                                                )}
                                                <p className="responsibilities-label">
                                                    Responsibilities
                                                </p>
                                                <ul className="responsibilities-list">
                                                    {card.responsibilities.map(
                                                        (responsibility, responsibilityIndex) => (
                                                            <li
                                                                key={responsibilityIndex}
                                                                className="responsibility-item"
                                                            >
                                                                {responsibility}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Experience
