import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function ExperienceButton() {
    const [isActive, setIsActive] = useState(false)
    const clickRef = useRef<HTMLButtonElement>(null)
    const handRef = useRef<HTMLDivElement>(null)
    const handIllustrationRef = useRef<HTMLDivElement>(null)
    const xButtonRef = useRef<HTMLDivElement>(null)
    const xIconRef = useRef<HTMLDivElement>(null)

    // Cursor interaction
    useEffect(() => {
        const container = clickRef.current
        if (!container) return

        const handleMouseDown = () => {
            container.style.cursor = 'grabbing'
        }

        container.addEventListener('mousedown', handleMouseDown)
        return () => container.removeEventListener('mousedown', handleMouseDown)
    }, [isActive])

    // Animation for the hand
    useEffect(() => {
        if (isActive || !handRef.current || !handIllustrationRef.current) return

        // Timeline for the hand animation
        const handTimeline = gsap.timeline({
            repeat: -1, // Infinite repeat
            repeatDelay: 1 // Pause between animations
        })

        handTimeline
            .to(handIllustrationRef.current, {
                backgroundPosition: 'bottom left',
                duration: 0.2,
                ease: 'power1.inOut'
            })
            .to(handRef.current, { x: -10, duration: 0.2 })
            .to(handRef.current, { x: 10, duration: 0.2 })
            .to(handRef.current, { x: 0, duration: 0.2 })
            .to(handIllustrationRef.current, {
                // Switch back to open hand
                backgroundPosition: 'top left',
                duration: 0.2
            })

        return () => {
            handTimeline.kill()
        } // Clean up
    }, [isActive])

    // Handle hover animation for X button
    useEffect(() => {
        if (!isActive) return

        const xButton = xButtonRef.current
        const xIcon = xIconRef.current
        if (!xButton || !xIcon) return

        const handleMouseEnter = () => {
            gsap.to(xIcon, { rotation: 90, duration: 0.3, ease: 'power2.out' })
        }
        const handleMouseLeave = () => {
            gsap.to(xIcon, { rotation: 0, duration: 0.3, ease: 'power2.out' })
        }

        xButton.addEventListener('mouseenter', handleMouseEnter)
        xButton.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            xButton.removeEventListener('mouseenter', handleMouseEnter)
            xButton.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [isActive])

    const handleHandClick = () => {
        setIsActive(true)
    }

    const handleXClick = () => {
        setTimeout(() => {
            setIsActive(false)
        }, 1500)
    }

    return (
        <>
            {!isActive && (
                <button className="hero-button" ref={clickRef} onClick={handleHandClick}>
                    <div className="arrow-container">
                        <div className="arrow isArrow-left">
                            <svg
                                width="11"
                                height="7"
                                viewBox="0 0 11 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                                    fill="#333"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div ref={handRef} className="hand">
                        <div ref={handIllustrationRef} className="hand-illustration"></div>
                    </div>
                    <div className="arrow-container">
                        <div className="arrow isArrow-right">
                            <svg
                                width="11"
                                height="7"
                                viewBox="0 0 11 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                                    fill="#333"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </button>
            )}
            {/* X Button - shown when active */}
            {isActive && (
                <div ref={xButtonRef} className="x-button" onClick={handleXClick}>
                    <div ref={xIconRef} className="x-icon">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 1L1 13"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M1 1L13 13"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </>
    )
}
