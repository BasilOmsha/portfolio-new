import { useMediaQuery } from 'react-responsive'

import ContactSection from './sections/contact/Contact.tsx'
import Experience from './sections/experience/Experience.tsx'
import Footer from './sections/footer/Footer.tsx'
import Hero from './sections/hero/Hero.tsx'
import NavBar from './sections/nav-bar/NavBar.tsx'
import Projects from './sections/projects/Projects.tsx'
import TechStack from './sections/tech-stack/TechStack.tsx'

function App() {
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    // useEffect(() => {
    //     // Only apply cursor effect if on desktop
    //     if (isDesktop) {
    //         const cursor = document.getElementById('cursor')

    //         if (cursor) {
    //             let animationId: number

    //             const handleMouseMove = (e: MouseEvent) => {
    //                 if (animationId) {
    //                     cancelAnimationFrame(animationId)
    //                 }

    //                 // animationId = requestAnimationFrame(() => {
    //                 //     cursor.style.left = e.clientX + 'px'
    //                 //     cursor.style.top = e.clientY + 'px'
    //                 // })
    //                 animationId = requestAnimationFrame(() => {
    //                     cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    //                 })
    //             }

    //             document.body.addEventListener('mousemove', handleMouseMove, { passive: true })

    //             // Clean up the event listener when component unmounts
    //             return () => {
    //                 document.body.removeEventListener('mousemove', handleMouseMove)
    //                 if (animationId) {
    //                     cancelAnimationFrame(animationId)
    //                 }
    //             }
    //         }
    //     }
    // }, [isDesktop])
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
        </>
    )
}

export default App
