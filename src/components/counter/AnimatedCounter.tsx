import { memo, useEffect, useRef, useState } from 'react'

import CountUp from 'react-countup'

import { counterItems } from '@/constants'

import './AnimatedCounter.css'

export const AnimatedCounter = memo(() => {
    const [isVisible, setIsVisible] = useState(false)
    const counterRef = useRef<HTMLDivElement>(null)

    // animate whn visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )

        if (counterRef.current) {
            observer.observe(counterRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={counterRef} id="counter" className="animated-counter">
            <div className="counter-grid">
                {counterItems.map((item) => (
                    <div key={item.label} className="counter-card">
                        <div className="counter-number">
                            {isVisible && (
                                <CountUp
                                    suffix={item.suffix}
                                    end={item.value}
                                    duration={2.5}
                                    useEasing={true}
                                />
                            )}
                        </div>
                        <div className="counter-label">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
})
