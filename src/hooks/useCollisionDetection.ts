import { useEffect, useRef, useState } from 'react'

export const useCollisionDetection = (
    projectsContainerRef: React.RefObject<HTMLDivElement | null>
) => {
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

    const scrollRef = useRef({
        lastScrollY: window.scrollY,
        isScrollingUp: false
    })

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

            // Check which element exists and get its last or first child
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
                    if (!isScrollingUp) {
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
                    transporterBottom.classList.remove('transporter-bottom')
                    // If we have a transporter element (normal case)
                    if (transporter) {
                        transporter.classList.remove('transporter-bottom')
                        transporter.classList.add('navbar-colliding')
                    }

                    // If we have a transporterBottom element (after it was converted)
                    if (transporterBottom) {
                        transporterBottom.classList.add('transporter')
                        transporterBottom.classList.add('navbar-colliding')
                    }
                }
                // else if (!isFirstChildTopCollidingNavBottom) {
                //     console.log('First child top is NOT colliding with navbar bottom')

                //     // Only revert to bottom position if last child is still colliding
                //     if (isLastChildBottomCollidingWithContainerBottom) {
                //         const transporter = document.querySelector('.transporter') as HTMLElement
                //         const transporterBottom = document.querySelector(
                //             '.transporter-bottom'
                //         ) as HTMLElement

                //         if (transporter) {
                //             transporter.classList.remove('navbar-colliding')
                //             transporter.classList.add('transporter-bottom')
                //         }

                //         if (transporterBottom) {
                //             transporterBottom.classList.remove('navbar-colliding')
                //             transporterBottom.classList.remove('transporter')
                //         }
                //     }
                // }
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
        projectsContainerRef,
        isNavbarBottomCollidingWithContainerTop,
        isLastChildBottomCollidingWithContainerBottom,
        isFirstChildTopCollidingWithNavBottomScrollingUp
    ])

    return {
        isNavbarBottomCollidingWithContainerTop,
        isLastChildBottomCollidingWithContainerBottom,
        isFirstChildTopCollidingWithNavBottomScrollingUp
    }
}
