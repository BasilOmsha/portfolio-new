import { useRef } from 'react'

import ASPDotNETCore from '@/components/tech-icons/ASPDotNETCore'
import TechIconCardExperience from '@/components/tech-icons/TechIconCardExperience.tsx'
import TitleHeader from '@/components/title-header/TitleHeader.tsx'
import { techStackIcons } from '@/constants'

import { useHideModel } from '@/hooks/useHideModel.ts'

import './TechStack.css'

function TechStack() {
    const techStackRef = useRef<HTMLElement>(null)
    const timeoutRef = useRef<number | null>(null)

    const isModelVisible = useHideModel(techStackRef, timeoutRef)
    return (
        <section id="skills" className="tech-stack-container" ref={techStackRef}>
            <div className="tech-stack-wrapper">
                {/* <TitleHeader title="My Go To Tech Stack" sub="🤝 What Do I Bring to the Table" /> */}
                <TitleHeader title="My Go To Tech Stack" />
                <div className="tech-grid">
                    {/* Backend skill card */}
                    <div className="tech-card">
                        <div className="tech-card-animated-bg" />
                        <div className="tech-card-content">
                            <div className="tech-icon-wrapper">
                                {isModelVisible ? (
                                    <ASPDotNETCore />
                                ) : (
                                    <div style={{ width: '100%', height: '100%' }} />
                                )}
                            </div>

                            <div className="tech-padding-x">
                                <p>Backend - ASP .NET Core</p>
                            </div>
                        </div>
                    </div>

                    {techStackIcons.map((techStackIcon) => (
                        <div key={techStackIcon.name} className="tech-card">
                            <div className="tech-card-animated-bg" />
                            <div className="tech-card-content">
                                <div className="tech-icon-wrapper">
                                    {isModelVisible ? (
                                        <TechIconCardExperience model={techStackIcon} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%' }} />
                                    )}
                                </div>
                                <div className="tech-padding-x">
                                    <p>{techStackIcon.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TechStack
