import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import TitleHeader from '@/components/title-header/TitleHeader.js'
import { expCards } from '@/constants'
import './ExperienceSection.css'

gsap.registerPlugin(ScrollTrigger)

function ExperienceSection() {
    useGSAP(() => {
        // Loop through each timeline card and animate them in
        // as the user scrolls to each card
        gsap.utils.toArray('.timeline-card').forEach((card) => {
            // Animate the card coming in from the left
            // and fade in
            gsap.from(card as Element, {
                // Move the card in from the left
                xPercent: -100,
                // Make the card invisible at the start
                opacity: 0,
                // Set the origin of the animation to the left side of the card
                transformOrigin: 'left left',
                // Animate over 1 second
                duration: 1,
                // Use a power2 ease-in-out curve
                ease: 'power2.inOut',
                // Trigger the animation when the card is 80% of the way down the screen
                scrollTrigger: {
                    // The card is the trigger element
                    trigger: card as Element,
                    // Trigger the animation when the card is 80% down the screen
                    start: 'top 80%'
                }
            })
        })

        // Animate the timeline height as the user scrolls
        // from the top of the timeline to 70% down the screen
        // The timeline height should scale down from 1 to 0
        // as the user scrolls up the screen
        gsap.to('.timeline', {
            // Set the origin of the animation to the bottom of the timeline
            transformOrigin: 'bottom bottom',
            // Animate the timeline height over 1 second
            ease: 'power1.inOut',
            // Trigger the animation when the timeline is at the top of the screen
            // and end it when the timeline is at 70% down the screen
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center',
                end: '97% center',
                // Update the animation as the user scrolls
                onUpdate: (self) => {
                    // Scale the timeline height as the user scrolls
                    // from 1 to 0 as the user scrolls up the screen
                    gsap.to('.timeline', {
                        scaleY: 1 - self.progress
                    })
                }
            }
        })

        // Loop through each expText element and animate them in
        // as the user scrolls to each text element
        gsap.utils.toArray('.expText').forEach((text) => {
            // Animate the text opacity from 0 to 1
            // and move it from the left to its final position
            // over 1 second with a power2 ease-in-out curve
            gsap.from(text as Element, {
                // Set the opacity of the text to 0
                opacity: 0,
                // Move the text from the left to its final position
                // (xPercent: 0 means the text is at its final position)
                xPercent: 0,
                // Animate over 1 second
                duration: 1,
                // Use a power2 ease-in-out curve
                ease: 'power2.inOut',
                // Trigger the animation when the text is 60% down the screen
                scrollTrigger: {
                    // The text is the trigger element
                    trigger: text as Element,
                    // Trigger the animation when the text is 60% down the screen
                    start: 'top 60%'
                }
            })
        }, '<') // position parameter - insert at the start of the animation
    }, [])

    return (
        <section id="experience" className="experience-section">
            <div className="experience-container">
                <TitleHeader title="My Work Experience" sub="💼 Career Overview" />
                <div className="experience-content">
                    <div className="experience-cards-container">
                        {/* {expCards.map((card, index) => ( */}
                        {expCards.map((card) => (
                            <div key={`${card.title}-${card.date}`} className="exp-card-wrapper">
                                <div className="card-section">
                                    {/* <GlowCard card={card} index={index}>
                                        <div>
                                            <img src={card.imgPath} alt="exp-img" />
                                        </div>
                                    </GlowCard> */}
                                </div>
                                <div className="content-section">
                                    <div className="content-wrapper">
                                        <div className="timeline-wrapper">
                                            <div className="timeline" />
                                            <div className="gradient-line" />
                                        </div>
                                        <div className="expText exp-text">
                                            <div className="timeline-logo">
                                                <img src={card.logoPath} alt="logo" />
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

export default ExperienceSection
