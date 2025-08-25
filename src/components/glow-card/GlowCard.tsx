import type { Certification, Education } from '@/constants'
import './GlowCard.css'

type Card = {
    review: string
    education?: Education
    certifications?: Certification[]
}

type GlowCardProps = {
    card: Card
}

function GlowCard({ card }: GlowCardProps) {
    return (
        <div className="card card-border timeline-card glow-card">
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
                                {card.education.thesis && (
                                    <>
                                        <span className="thesis-topic">
                                            Thesis Topic: {card.education.thesis.topic}
                                        </span>
                                        <span className="thesis-description">
                                            {card.education.thesis.description}
                                        </span>
                                        {card.education.thesis.grade && (
                                            <span className="thesis-grade">
                                                🎯 Grade: {card.education.thesis.grade}
                                            </span>
                                        )}
                                        {card.education.thesis.publicationUrl && (
                                            <a
                                                href={card.education.thesis.publicationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="author-link"
                                                style={{
                                                    color: '#0498bd',
                                                    fontSize: '0.9rem',
                                                    lineHeight: '1.8'
                                                }}
                                            >
                                                View Publication
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {card.certifications && card.certifications.length > 0 && (
                    <div className="certifications-section">
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
                                            fontSize: '0.9rem',
                                            lineHeight: '1.7'
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
        </div>
    )
}

export default GlowCard
