import type { MouseEvent, ReactNode } from 'react'
import { useRef } from 'react'
import './GlowCard.css'

type Certification = {
    title: string
    issuer: string
    date: string
    credentialId?: string
    credentialUrl?: string
    logoPath?: string
}

type Education = {
    degree: string
    institution: string
    location: string
    languageOfInstruction: string
    gpa: string | null
    gradingScale: string | null
    period: string
}

type Card = {
    review: string
    education?: Education
    certifications?: Certification[]
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
                {card.education && (
                    <div className="education-header">
                        <span className="education-badge">🎓 {card.education.location}</span>
                        <span className="education-period">📅 {card.education.period}</span>
                    </div>
                )}
                {!card.education && card.certifications && card.certifications.length > 0 && (
                    <div className="certification-header">
                        <span className="cert-badge">🏆 Certification</span>
                        <span className="cert-date-badge">📅 {card.certifications[0].date}</span>
                    </div>
                )}
            </div>
            <div className="review-container">
                {card.education && (
                    <div className="education-section">
                        <div className="education-item">
                            <h4 className="degree-title">{card.education.degree}</h4>
                            <p className="institution-name">{card.education.institution}</p>
                            <div className="education-meta">
                                {card.education.languageOfInstruction && (
                                    <span className="education-lang">
                                        🌐 {card.education.languageOfInstruction}
                                    </span>
                                )}
                                {card.education.gpa && (
                                    <span className="education-gpa">
                                        📊 GPA: {card.education.gpa}
                                        {card.education.gradingScale &&
                                            ` (${card.education.gradingScale})`}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {card.certifications && card.certifications.length > 0 && (
                    <div className="certifications-section">
                        {/* <h3 className="certifications-title"> Certification</h3> */}
                        {card.certifications.map((cert, index) => (
                            <div key={index} className="certification-item">
                                <h4 className="cert-title">{cert.title}</h4>
                                <p className="cert-issuer">{cert.issuer}</p>
                                <p className="cert-date">Issued {cert.date}</p>
                                {cert.credentialId && (
                                    <p className="cert-id">Credential ID: {cert.credentialId}</p>
                                )}
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="author-link"
                                        style={{
                                            color: '#0498bd',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Show credential
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}

export default GlowCard
