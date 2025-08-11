import type { MouseEvent, ReactNode } from 'react'
import { useRef } from 'react'
import './GlowCard.css'

type Card = {
    review: string
}

type GlowCardProps = {
    card: Card
    children: ReactNode
    index: number
}

function GlowCard({ card, children, index }: GlowCardProps) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    // when mouse moves over a card, rotate the glow effect
    const handleMouseMove = (index: number) => (e: MouseEvent<HTMLDivElement>) => {
        // get the current card
        const card = cardRefs.current[index]
        if (!card) return

        // get the mouse position relative to the card
        const rect = card.getBoundingClientRect()
        const mouseX = e.clientX - rect.left - rect.width / 2
        const mouseY = e.clientY - rect.top - rect.height / 2

        // calculate the angle from the center of the card to the mouse
        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)

        // adjust the angle so that it's between 0 and 360
        angle = (angle + 360) % 360

        // set the angle as a CSS variable
        card.style.setProperty('--start', (angle + 60).toString())
    }

    return (
        <div
            ref={(el) => {
                cardRefs.current[index] = el
            }}
            onMouseMove={handleMouseMove(index)}
            className="card card-border timeline-card glow-card"
        >
            <div className="glow" />
            <div className="star-rating">
                {Array.from({ length: 5 }, (_, i) => (
                    <img src="/images/star.png" key={i} alt="star" className="star-image" />
                ))}
            </div>
            <div className="review-container">
                <p className="review-text">{card.review}</p>
            </div>
            {children}
        </div>
    )
}

export default GlowCard
