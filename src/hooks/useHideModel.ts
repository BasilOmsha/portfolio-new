import { useEffect, useState } from 'react'

function useHideModel(
    modelRef: React.RefObject<HTMLElement | null>,
    timeoutRef: React.RefObject<number | null>
) {
    const [isModelInView, setIsModelInView] = useState(false)

    useEffect(() => {
        const modelElement = modelRef.current
        if (!modelElement) return
        console.log(isModelInView)
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                        timeoutRef.current = null
                    }
                    setIsModelInView(true)
                } else {
                    timeoutRef.current = window.setTimeout(() => {
                        setIsModelInView(false)
                        timeoutRef.current = null
                    }, 300)
                }
            },
            { threshold: 0.0 }
        )

        observer.observe(modelElement)

        return () => {
            observer.disconnect()
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isModelInView
}
export default useHideModel
