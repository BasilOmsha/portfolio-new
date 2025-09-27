import { useCallback, useEffect, useRef } from 'react'

import { VERSION_CHECK_CONFIG } from '../constants/version.ts'
import { updateNotificationService } from '../services/update-notification.ts'
import { versionManager } from '../services/version-manager.ts'

interface UseVersionCheckOptions {
    enabled?: boolean
    checkInterval?: number
    onUpdateDetected?: (currentVersion: string, newVersion: string) => void
}

export const useVersionCheck = (options: UseVersionCheckOptions = {}) => {
    const {
        enabled = true,
        checkInterval = VERSION_CHECK_CONFIG.checkInterval,
        onUpdateDetected
    } = options

    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const isCheckingRef = useRef(false)
    const mountedRef = useRef(true)

    // Clear notification state when app loads (allows new notifications after refresh)
    useEffect(() => {
        updateNotificationService.clearShownVersion()
    }, [])

    const performVersionCheck = useCallback(async () => {
        if (isCheckingRef.current || !mountedRef.current) {
            return
        }

        isCheckingRef.current = true

        try {
            const result = await versionManager.checkForUpdate()

            if (!mountedRef.current) {
                return
            }

            if (result.hasUpdate) {
                const currentVersion = versionManager.getCurrentVersion()

                updateNotificationService.showUpdateNotification(
                    currentVersion.version,
                    result.newVersion.version,
                    result.newVersion.buildHash
                )

                onUpdateDetected?.(currentVersion.version, result.newVersion.version)
            }
        } catch (error) {
            console.warn('Version check failed:', error)
        } finally {
            if (mountedRef.current) {
                isCheckingRef.current = false
            }
        }
    }, [onUpdateDetected])

    const startVersionChecking = useCallback(() => {
        if (!enabled || intervalRef.current) {
            return
        }

        // Perform initial check after a short delay
        setTimeout(performVersionCheck, 5000)

        // Set up interval for periodic checks
        intervalRef.current = setInterval(performVersionCheck, checkInterval)
    }, [enabled, checkInterval, performVersionCheck])

    const stopVersionChecking = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        versionManager.cancel()
    }, [])

    useEffect(() => {
        mountedRef.current = true

        if (enabled) {
            startVersionChecking()
        }

        return () => {
            mountedRef.current = false
            stopVersionChecking()
        }
    }, [enabled, startVersionChecking, stopVersionChecking])

    // Handle visibility change to pause/resume checking when tab is not active
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopVersionChecking()
            } else if (enabled && mountedRef.current) {
                startVersionChecking()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [enabled, startVersionChecking, stopVersionChecking])

    return {
        performVersionCheck,
        startVersionChecking,
        stopVersionChecking
    }
}
