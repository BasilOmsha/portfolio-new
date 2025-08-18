import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import ProjectChapter from '@/components/project-chapter/ProjectChapter.tsx'
import TitleHeader from '@/components/title-header/TitleHeader.tsx'
import { projectChapters } from '@/constants'

import './Projects.css'

function Projects() {
    const [activeProject, setActiveProject] = useState(0)
    const [isNavbarBottomCollidingWithContainerTop, setIsNavbarBottomCollidingWithContainerTop] =
        useState(false)
    const [
        isLastChildBottomCollidingWithContainerBottom,
        setIsLastChildBottomCollidingWithContainerBottom
    ] = useState(false)

    const [
        isFirstChildTopCollidingWithNavBottomScrollingUp,
        setIsFirstChildTopCollidingWithNavBottomScrollingUp
    ] = useState(false)

    const sectionsRef = useRef<HTMLDivElement>(null)
    const projectsContainerRef = useRef<HTMLDivElement>(null)
    const measuresRef = useRef({
        chapters: [] as [number, number][],
        windowHeight: window.innerHeight
    })

    const scrollRef = useRef({
        lastScrollY: window.scrollY,
        isScrollingUp: false
    })

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

    useEffect(() => {
        const checkContainerCollisions = () => {
            if (!projectsContainerRef.current) return

            // Track scroll direction
            const currentScrollY = window.scrollY
            const isScrollingUp = currentScrollY < scrollRef.current.lastScrollY
            scrollRef.current = {
                lastScrollY: currentScrollY,
                isScrollingUp
            }

            const projectsContainer = projectsContainerRef.current.getBoundingClientRect()
            const projectsContainerTop = projectsContainer.top
            const projectsContainerBottom = projectsContainer.bottom

            // Get navbar element and its height
            const navbar = document.querySelector('.navbar') as HTMLElement
            const navbarHeight = navbar ? navbar.offsetHeight : 0
            const navbarBottom = navbarHeight

            // get the first and last child of the transporter
            const transporter = document.querySelector('.transporter') as HTMLElement
            const transporterBottom = document.querySelector('.transporter-bottom') as HTMLElement
            let lastChildBottom = 0
            let firstChildTop = 0

            // Check which element exists and get its last child
            let lastChildElement: HTMLElement | null = null
            let firstChildElement: HTMLElement | null = null
            if (transporter) {
                lastChildElement = transporter.lastElementChild as HTMLElement
                firstChildElement = transporter.firstElementChild as HTMLElement
            } else if (transporterBottom) {
                lastChildElement = transporterBottom.lastElementChild as HTMLElement
                firstChildElement = transporterBottom.firstElementChild as HTMLElement
            }

            if (lastChildElement) {
                const lastChildRect = lastChildElement.getBoundingClientRect()
                lastChildBottom = lastChildRect.bottom
            }

            if (firstChildElement) {
                const firstChildRect = firstChildElement.getBoundingClientRect()
                firstChildTop = firstChildRect.top
            }

            // Check collision 1: Navbar bottom collides with container top
            const isNavbarBottomCollidingTop = projectsContainerTop <= navbarBottom

            const isLastChildBottomCollidingBottom = lastChildBottom >= projectsContainerBottom

            const isFirstChildTopCollidingNavBottom = firstChildTop >= navbarBottom

            // Only log when collision states change
            if (isNavbarBottomCollidingTop !== isNavbarBottomCollidingWithContainerTop) {
                setIsNavbarBottomCollidingWithContainerTop(isNavbarBottomCollidingTop)
                if (isNavbarBottomCollidingTop) {
                    console.log('Navbar bottom is colliding with projects container top')
                    // Apply the collision class to move transporter to top: 0px
                    const transporter = document.querySelector('.transporter') as HTMLElement
                    const transporterBottom = document.querySelector(
                        '.transporter-bottom'
                    ) as HTMLElement
                    if (transporterBottom) {
                        transporterBottom.classList.add('transporter')
                    }
                    if (transporter) {
                        if (transporterBottom) {
                            transporter.classList.remove('transporter-bottom')
                        }
                        transporter.classList.add('navbar-colliding')
                    }
                }
                if (!isNavbarBottomCollidingTop) {
                    console.log('Navbar bottom is NOT colliding with projects container top')
                    // Remove the collision class to restore normal position
                    const transporter = document.querySelector('.transporter') as HTMLElement
                    const transporterBottom = document.querySelector(
                        '.transporter-bottom'
                    ) as HTMLElement
                    if (transporterBottom) {
                        transporterBottom.classList.add('transporter')
                        transporterBottom.classList.remove('navbar-colliding')
                        transporterBottom.classList.remove('transporter-bottom')
                    }
                    if (transporter) {
                        // transporter.style.top = '80px'
                        transporter.classList.remove('navbar-colliding')
                        transporter.classList.remove('transporter-bottom')
                    }
                    // if (transporterBottom) {
                    //     transporterBottom.classList.remove('navbar-colliding')
                    // }
                }
            }

            // whe the bottm of the last chidl collid with bottom
            if (
                isLastChildBottomCollidingBottom !== isLastChildBottomCollidingWithContainerBottom
            ) {
                setIsLastChildBottomCollidingWithContainerBottom(isLastChildBottomCollidingBottom)
                if (isLastChildBottomCollidingBottom) {
                    console.log('Last child bottom is colliding with projects container bottom')
                    const transporter = document.querySelector('.transporter') as HTMLElement

                    if (transporter) {
                        transporter.classList.remove('navbar-colliding')
                        // transporter.classList.remove('transporter')
                        transporter.classList.add('transporter-bottom')
                    }
                    const transporterBottom = document.querySelector(
                        '.transporter-bottom'
                    ) as HTMLElement
                    if (transporterBottom) {
                        transporterBottom.classList.remove('transporter')
                    }
                }
            }

            // while scrolling up check if the first child top collides with nav bottom
            if (
                isFirstChildTopCollidingNavBottom !==
                isFirstChildTopCollidingWithNavBottomScrollingUp
            ) {
                setIsFirstChildTopCollidingWithNavBottomScrollingUp(
                    isFirstChildTopCollidingNavBottom
                )
                if (isFirstChildTopCollidingNavBottom && isScrollingUp) {
                    console.log('First child top is colliding with navbar bottom (scrolling up)')

                    // UNDO the last child collision changes and apply navbar-colliding
                    const transporter = document.querySelector('.transporter') as HTMLElement
                    const transporterBottom = document.querySelector(
                        '.transporter-bottom'
                    ) as HTMLElement

                    // If we have a transporter element (normal case)
                    if (transporter) {
                        transporter.classList.remove('transporter-bottom')
                        transporter.classList.add('navbar-colliding')
                    }

                    // If we have a transporterBottom element (after it was converted)
                    if (transporterBottom) {
                        transporterBottom.classList.remove('transporter-bottom')
                        transporterBottom.classList.add('transporter')
                        transporterBottom.classList.add('navbar-colliding')
                    }
                } else if (!isFirstChildTopCollidingNavBottom) {
                    console.log('First child top is NOT colliding with navbar bottom')

                    // Only revert to bottom position if last child is still colliding
                    if (isLastChildBottomCollidingWithContainerBottom) {
                        const transporter = document.querySelector('.transporter') as HTMLElement
                        const transporterBottom = document.querySelector(
                            '.transporter-bottom'
                        ) as HTMLElement

                        if (transporter) {
                            transporter.classList.remove('navbar-colliding')
                            transporter.classList.add('transporter-bottom')
                        }

                        if (transporterBottom) {
                            transporterBottom.classList.remove('navbar-colliding')
                            transporterBottom.classList.remove('transporter')
                        }
                    }
                }
            }
        }

        // Check on mount
        checkContainerCollisions()

        // Add scroll listener to check collisions during scroll
        window.addEventListener('scroll', checkContainerCollisions, { passive: true })

        return () => {
            window.removeEventListener('scroll', checkContainerCollisions)
        }
    }, [
        isNavbarBottomCollidingWithContainerTop,
        isLastChildBottomCollidingWithContainerBottom,
        isFirstChildTopCollidingWithNavBottomScrollingUp
    ])

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
                    {/* <div
                        className={`transporter ${isNavbarBottomCollidingWithContainerTop || isNavbarTopCollidingWithContainerBottom ? 'navbar-colliding' : ''}`}
                    > */}
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
