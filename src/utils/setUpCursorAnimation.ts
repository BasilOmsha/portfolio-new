export function setupCursorAnimation(): (() => void) | undefined {
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

    // Return cleanup function
    return () => {
        document.body.removeEventListener('mousemove', handleMouseMove)
        document.body.removeEventListener('mouseenter', handleMouseEnter)
        document.body.removeEventListener('mouseleave', handleMouseLeave)
        if (animationId) {
            cancelAnimationFrame(animationId)
        }
    }
}
