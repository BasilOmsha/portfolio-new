import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import Hero from './sections/hero/Hero.tsx'
import Main from './sections/Main.tsx'

function App() {
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    useEffect(() => {
        // Only apply cursor effect if on desktop
        if (isDesktop) {
            const cursor = document.getElementById('cursor')

            if (cursor) {
                const handleMouseMove = (e: MouseEvent) => {
                    cursor.style.left = e.clientX + 'px'
                    cursor.style.top = e.clientY + 'px'
                }

                document.body.addEventListener('mousemove', handleMouseMove)

                // Clean up the event listener when component unmounts
                return () => {
                    document.body.removeEventListener('mousemove', handleMouseMove)
                }
            }
        }
    }, [isDesktop])
    return (
        <>
            {isDesktop && <div className="cursor" id="cursor"></div>}
            <Hero />
            <Main />
        </>
    )
}

export default App
