import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Route, Routes } from 'react-router'

import CookieConsent from './components/cookies/CookiesConsent.tsx'
import { navLinks } from './constants/index.ts'
import ContactSection from './sections/contact/Contact.tsx'
import Dashboard from './sections/dashboard/Dashboard.tsx'
import Experience from './sections/experience/Experience.tsx'
import Footer from './sections/footer/Footer.tsx'
import Hero from './sections/hero/Hero.tsx'
import NavBar from './sections/nav-bar/NavBar.tsx'
import Projects from './sections/projects/Projects.tsx'
import TechStack from './sections/tech-stack/TechStack.tsx'
import { preventDevTools } from './utils/preventDevTool.ts'
import { setupCursorAnimation } from './utils/setUpCursorAnimation.ts'

function App() {
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    useEffect(() => {
        return preventDevTools()
    }, [])

    useEffect(() => {
        if (isDesktop) {
            return setupCursorAnimation()
        }
    }, [isDesktop])

    const MainPage = () => (
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
        </>
    )

    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path={navLinks[3].link} element={<Dashboard />} />
            </Routes>
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default App
