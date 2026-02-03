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
            <div className="glow-card-content">
                {card.education && (
                    <div className="education-section">
                        <div className="section-header">
                            <span className="section-type">Education</span>
                            <span className="section-period">{card.education.period}</span>
                        </div>
                        <h4 className="degree-title">{card.education.degree}</h4>
                        <p className="institution-name">{card.education.institution}</p>
                        <p className="location-text">{card.education.location}</p>

                        {(card.education.gpa || card.education.languageOfInstruction) && (
                            <div className="education-meta">
                                {card.education.languageOfInstruction && (
                                    <span className="meta-item">
                                        {card.education.languageOfInstruction}
                                    </span>
                                )}
                                {card.education.gpa && (
                                    <span className="meta-item">
                                        GPA: {card.education.gpa}
                                        {card.education.gradingScale &&
                                            ` / ${card.education.gradingScale.split('-')[1]}`}
                                    </span>
                                )}
                            </div>
                        )}

                        {card.education.thesis && (
                            <div className="thesis-section">
                                <p className="thesis-label">Thesis</p>
                                <p className="thesis-topic">{card.education.thesis.topic}</p>
                                <p className="thesis-description">
                                    {card.education.thesis.description}
                                </p>
                                <div className="thesis-footer">
                                    {card.education.thesis.grade && (
                                        <span className="thesis-grade">
                                            Grade: {card.education.thesis.grade}
                                        </span>
                                    )}
                                    {card.education.thesis.publicationUrl && (
                                        <a
                                            href={card.education.thesis.publicationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="thesis-link"
                                        >
                                            View Publication
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {card.certifications && card.certifications.length > 0 && (
                    <div className="certifications-section">
                        <div className="section-header">
                            <span className="section-type">Certification</span>
                            <span className="section-period">{card.certifications[0].date}</span>
                        </div>
                        {card.certifications.map((cert, index) => (
                            <div key={index} className="certification-item">
                                <h4 className="cert-title">{cert.title}</h4>
                                <p className="cert-issuer">{cert.issuer}</p>
                                {cert.credentialId && (
                                    <p className="cert-id">ID: {cert.credentialId}</p>
                                )}
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cert-link"
                                    >
                                        View Credential
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
