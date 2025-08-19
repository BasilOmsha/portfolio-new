import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import ProjectChapter from '@/components/project-chapter/ProjectChapter.tsx'
import TitleHeader from '@/components/title-header/TitleHeader.tsx'
import { projectChapters } from '@/constants'
import { useCollisionDetection } from '@/hooks/useCollisionDetection.ts'

import './Projects.css'

function Projects() {
    const [activeProject, setActiveProject] = useState(0)

    const sectionsRef = useRef<HTMLDivElement>(null)
    const projectsContainerRef = useRef<HTMLDivElement>(null)
    const measuresRef = useRef({
        chapters: [] as [number, number][],
        windowHeight: window.innerHeight
    })

    useCollisionDetection(projectsContainerRef)

    // Update measures based on actual project content elements
    useEffect(() => {
        const updateMeasures = () => {
            if (!sectionsRef.current) return

            const projectElements = sectionsRef.current.querySelectorAll(
                '.projects-chapter-container'
            )
            const chapters: [number, number][] = []

            projectElements.forEach((element) => {
                const rect = element.getBoundingClientRect()
                const scrollOffset = window.pageYOffset + rect.top
                chapters.push([scrollOffset, rect.height])
            })

            measuresRef.current = {
                chapters,
                windowHeight: window.innerHeight
            }
        }

        updateMeasures()
        window.addEventListener('resize', updateMeasures)

        // Update measures when content changes
        const timer = setTimeout(updateMeasures, 100)

        return () => {
            window.removeEventListener('resize', updateMeasures)
            clearTimeout(timer)
        }
    }, [activeProject])

    // Scroll listener to auto-change active project
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const { chapters, windowHeight } = measuresRef.current

            // Find which section is currently in view
            let newActiveProject = 0
            for (let i = 0; i < chapters.length; i++) {
                const [offset, height] = chapters[i]
                const sectionCenter = offset + height * 0.5
                const viewportCenter = scrollY + windowHeight * 0.5

                if (viewportCenter >= sectionCenter - 100) {
                    newActiveProject = i
                }
            }

            if (newActiveProject !== activeProject) {
                setActiveProject(newActiveProject)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [activeProject])

    const handleNavigation = (t: number, i: React.MouseEvent) => {
        i.preventDefault()
        setActiveProject(t)

        const h = {
            scrollY: window.scrollY
        }
        const a = measuresRef.current.chapters[t]
        if (!a) return

        const r = a[0] + a[1] * 0.5 - measuresRef.current.windowHeight * 0.5

        gsap.to(h, {
            duration: 0.3,
            scrollY: r,
            onUpdate: () => {
                window.scrollTo(0, h.scrollY)
            }
        })
    }

    return (
        <section id="work" className="projects-section" ref={sectionsRef}>
            <div style={{ marginBottom: '50px' }}>
                <TitleHeader title="A Pick of Personal & Professional Projects" />
            </div>
            <div className="projects-container" ref={projectsContainerRef}>
                <nav className="navigation">
                    <div className="transporter">
                        <a
                            className={`item ${activeProject === 0 ? 'is-active' : ''} ${activeProject > 0 ? 'is-before' : ''}`}
                            href="#"
                            onClick={(i) => handleNavigation(0, i)}
                        >
                            <span className="number">01</span>
                        </a>
                        <a
                            className={`item ${activeProject === 1 ? 'is-active' : ''} ${activeProject > 1 ? 'is-before' : ''} ${activeProject < 1 ? 'is-after' : ''}`}
                            href="#"
                            onClick={(i) => handleNavigation(1, i)}
                        >
                            <span className="number">02</span>
                        </a>
                        <a
                            className={`item ${activeProject === 2 ? 'is-active' : ''} ${activeProject > 2 ? 'is-before' : ''} ${activeProject < 2 ? 'is-after' : ''}`}
                            href="#"
                            onClick={(i) => handleNavigation(2, i)}
                        >
                            <span className="number">03</span>
                        </a>
                        <a
                            className={`item ${activeProject === 3 ? 'is-active' : ''} ${activeProject > 3 ? 'is-before' : ''} ${activeProject < 3 ? 'is-after' : ''}`}
                            href="#"
                            onClick={(i) => handleNavigation(3, i)}
                        >
                            <span className="number">04</span>
                        </a>
                        <a
                            className={`item ${activeProject === 4 ? 'is-active' : ''} ${activeProject > 4 ? 'is-before' : ''} ${activeProject < 4 ? 'is-after' : ''}`}
                            href="#"
                            onClick={(i) => handleNavigation(4, i)}
                        >
                            <span className="number">05</span>
                        </a>
                        <a
                            className={`item ${activeProject === 5 ? 'is-active' : ''} ${activeProject > 5 ? 'is-before' : ''} ${activeProject < 5 ? 'is-after' : ''}`}
                            href="#"
                            onClick={(i) => handleNavigation(5, i)}
                        >
                            <span className="number">06</span>
                        </a>
                    </div>
                </nav>
                <div className="projects-chapters">
                    {projectChapters.map((chapter) => (
                        <ProjectChapter key={chapter.index} {...chapter} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
