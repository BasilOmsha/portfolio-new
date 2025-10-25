import { useEffect, useState } from 'react'

function useHideModel(
    modelRef: React.RefObject<HTMLElement | null>,
    timeoutRef: React.RefObject<number | null>
) {
    const [isModelVisible, setIsModelVisible] = useState(false)

    useEffect(() => {
        const modelElement = modelRef.current
        if (!modelElement) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                        timeoutRef.current = null
                    }
                    setIsModelVisible(true)
                } else {
                    timeoutRef.current = window.setTimeout(() => {
                        setIsModelVisible(false)
                        timeoutRef.current = null
                    }, 300)
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(modelElement)

        return () => {
            observer.disconnect()
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isModelVisible
}
export default useHideModel
