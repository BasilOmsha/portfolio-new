import ASPDotNETCore from '@/components/tech-icons/ASPDotNETCore'
import TechIconCardExperience from '@/components/tech-icons/TechIconCardExperience.tsx'
import TitleHeader from '@/components/title-header/TitleHeader.tsx'
import { techStackIcons } from '@/constants'

import './TechStack.css'

function TechStack() {
    return (
        <div id="skills" className="tech-stack-container">
            <div className="tech-stack-wrapper">
                {/* <TitleHeader title="My Go To Tech Stack" sub="🤝 What Do I Bring to the Table" /> */}
                <TitleHeader title="My Go To Tech Stack" />
                <div className="tech-grid">
                    {/* Backend skill card */}
                    <div className="tech-card">
                        <div className="tech-card-animated-bg" />
                        <div className="tech-card-content">
                            <div className="tech-icon-wrapper">
                                <ASPDotNETCore />
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
                                    <TechIconCardExperience model={techStackIcon} />
                                </div>
                                <div className="tech-padding-x">
                                    <p>{techStackIcon.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TechStack
