import { useEffect, useState } from 'react'

export function useHideModel(
    modelRef: React.RefObject<HTMLElement | null>,
    timeoutRef: React.RefObject<number | null>
) {
    const [isModelVisible, setIsModelVisible] = useState(false)
    useEffect(() => {
        const modelElement = modelRef.current
        if (!modelElement) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // If Hero section is in view (even partially)
                    if (entry.isIntersecting) {
                        if (timeoutRef.current !== null) {
                            clearTimeout(timeoutRef.current)
                            timeoutRef.current = null
                        }
                        setIsModelVisible(true)
                    } else {
                        // Delay unmount slightly to avoid flickering during fast scrolls
                        timeoutRef.current = window.setTimeout(() => {
                            setIsModelVisible(false)
                            timeoutRef.current = null
                        }, 300)
                    }
                })
            },
            {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0 // Trigger when any part enters viewport
            }
        )

        observer.observe(modelElement)

        // Cleanup
        return () => {
            if (modelElement) {
                observer.unobserve(modelElement)
            }
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isModelVisible
}

export default useHideModel
