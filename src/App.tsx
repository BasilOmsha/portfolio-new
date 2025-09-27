import { useCallback, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import CookieConsent from './components/cookies/CookiesConsent.tsx'
import UpdateNotification from './components/update-notification/UpdateNotification.tsx'
import { useVersionCheck } from './hooks/useVersionCheck.ts'
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

    const setupCursorAnimation = useCallback(() => {
        const cursor = document.getElementById('cursor')
        if (!cursor) return

        let animationId: number
        let lastX = 0
        let lastY = 0
        let isAnimating = false

        const updateCursor = (x: number, y: number) => {
            if (isAnimating) return

            isAnimating = true
            animationId = requestAnimationFrame(() => {
                // Use transform3d for better GPU acceleration
                cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
                isAnimating = false
            })
        }

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = Math.abs(e.clientX - lastX)
            const deltaY = Math.abs(e.clientY - lastY)

            // Only update if mouse moved significantly (reduces unnecessary repaints)
            if (deltaX > 0.5 || deltaY > 0.5) {
                lastX = e.clientX
                lastY = e.clientY
                updateCursor(e.clientX, e.clientY)
            }
        }

        // Add mouse enter/leave effects for better UX
        const handleMouseEnter = () => {
            cursor.style.opacity = '0.99'
        }

        const handleMouseLeave = () => {
            cursor.style.opacity = '0'
        }

        document.body.addEventListener('mousemove', handleMouseMove, { passive: true })
        document.body.addEventListener('mouseenter', handleMouseEnter, { passive: true })
        document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true })

        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseenter', handleMouseEnter)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [])

    useEffect(() => {
        if (isDesktop) {
            const cleanup = setupCursorAnimation()
            return cleanup
        }
    }, [isDesktop, setupCursorAnimation])

    useVersionCheck({
        enabled: import.meta.env.PROD, // Only check in production
        onUpdateDetected: (current, newVersion) => {
            console.log(`Update detected: ${current} -> ${newVersion}`)
        }
    })

    return (
        <>
            {isDesktop && <div className="cursor" id="cursor"></div>}
            <CookieConsent />
            <NavBar />
            <Hero />
            <Projects />
            <Experience />
            <TechStack />
            <ContactSection />
            <Footer />
            <Analytics />
            <SpeedInsights />
            <UpdateNotification />
        </>
    )
}

export default App
