import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import ContactSection from './sections/contact/Contact.tsx'
import Experience from './sections/experience/Experience.tsx'
import Footer from './sections/footer/Footer.tsx'
import Hero from './sections/hero/Hero.tsx'
import NavBar from './sections/nav-bar/NavBar.tsx'
import Projects from './sections/projects/Projects.tsx'
import TechStack from './sections/tech-stack/TechStack.tsx'

function App() {
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
                    (e.ctrlKey && e.key === 'u')
                ) {
                    e.preventDefault()
                    return false
                }
            }

            const handleContextMenu = (e: MouseEvent) => {
                e.preventDefault()
                return false
            }

            document.addEventListener('keydown', handleKeyDown)
            document.addEventListener('contextmenu', handleContextMenu)

            return () => {
                document.removeEventListener('keydown', handleKeyDown)
                document.removeEventListener('contextmenu', handleContextMenu)
            }
        }
    }, [])

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

                    // animationId = requestAnimationFrame(() => {
                    //     cursor.style.left = e.clientX + 'px'
                    //     cursor.style.top = e.clientY + 'px'
                    // })
                    animationId = requestAnimationFrame(() => {
                        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
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
            <Projects />
            <Experience />
            <TechStack />
            <ContactSection />
            <Footer />
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default App
