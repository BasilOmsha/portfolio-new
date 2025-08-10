import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import ExperienceSection from './sections/experience/ExperienceSection.tsx'
import Hero from './sections/hero/Hero.tsx'
import Main from './sections/Main.tsx'
import NavBar from './sections/nav-bar/NavBar.tsx'

function App() {
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    useEffect(() => {
        // Only apply cursor effect if on desktop
        if (isDesktop) {
            const cursor = document.getElementById('cursor')

            if (cursor) {
                let animationId: number

                const handleMouseMove = (e: MouseEvent) => {
                    if (animationId) {
                        cancelAnimationFrame(animationId)
                    }

                    animationId = requestAnimationFrame(() => {
                        cursor.style.left = e.clientX + 'px'
                        cursor.style.top = e.clientY + 'px'
                    })
                }

                document.body.addEventListener('mousemove', handleMouseMove, { passive: true })

                // Clean up the event listener when component unmounts
                return () => {
                    document.body.removeEventListener('mousemove', handleMouseMove)
                    if (animationId) {
                        cancelAnimationFrame(animationId)
                    }
                }
            }
        }
    }, [isDesktop])
    return (
        <>
            {isDesktop && <div className="cursor" id="cursor"></div>}
            <NavBar />
            <Hero />
            <ExperienceSection />
            <Main />
        </>
    )
}

export default App
