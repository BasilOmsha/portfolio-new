import { Suspense, useRef } from 'react'

import { BeatLoader } from 'react-spinners'

import ModelLoader from '@/components/ModalLoader.tsx'
import ASPDotNETCore from '@/components/tech-icons/ASPDotNETCore'
import TechIconCardExperience from '@/components/tech-icons/TechIconCardExperience.tsx'
import TitleHeader from '@/components/title-header/TitleHeader.tsx'
import { techStackIcons } from '@/constants'

import useHideModel from '@/hooks/useHideModel.ts'

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
                                    <Suspense
                                        fallback={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <BeatLoader size={10} color="#c7ad98" />
                                            </div>
                                        }
                                    >
                                        <ModelLoader size={50} color="#c7ad98">
                                            <ASPDotNETCore />
                                        </ModelLoader>
                                    </Suspense>
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
                                        <Suspense
                                            fallback={
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ color: '#045e01ff' }}>
                                                        Finalizing{' '}
                                                    </span>
                                                    <BeatLoader size={10} color="#045e01ff" />
                                                </div>
                                            }
                                        >
                                            <ModelLoader size={50} color="#c7ad98">
                                                <TechIconCardExperience model={techStackIcon} />
                                            </ModelLoader>
                                        </Suspense>
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
