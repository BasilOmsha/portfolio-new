import type { UpdateNotificationState } from '../types/version.ts'

type NotificationListener = (state: UpdateNotificationState) => void

export class UpdateNotificationService {
    private listeners: Set<NotificationListener> = new Set()
    private state: UpdateNotificationState = {
        isUpdateAvailable: false,
        currentVersion: '',
        newVersion: '',
        isVisible: false
    }
    private readonly NOTIFICATION_SHOWN_KEY = 'update_notification_shown_for'

    /**
     * Subscribe to notification state changes
     */
    subscribe(listener: NotificationListener): () => void {
        this.listeners.add(listener)
        listener(this.state)

        return () => {
            this.listeners.delete(listener)
        }
    }

    /**
     * Show update notification
     */
    showUpdateNotification(currentVersion: string, newVersion: string, newBuildHash: string): void {
        // Check if we've already shown notification for this version
        const shownForVersion = this.getShownForVersion()
        if (shownForVersion === newBuildHash) {
            return // Don't show again for same version
        }

        this.updateState({
            isUpdateAvailable: true,
            currentVersion,
            newVersion,
            isVisible: true
        })

        // Mark that we've shown notification for this version
        this.markNotificationShown(newBuildHash)
    }

    /**
     * Mark notification as shown for this version
     */
    private markNotificationShown(buildHash: string): void {
        try {
            localStorage.setItem(this.NOTIFICATION_SHOWN_KEY, buildHash)
        } catch (error) {
            console.warn('Failed to mark notification as shown:', error)
        }
    }

    /**
     * Get which version's notification was shown
     */
    private getShownForVersion(): string | null {
        try {
            return localStorage.getItem(this.NOTIFICATION_SHOWN_KEY)
        } catch (error) {
            console.warn('Failed to get shown version:', error)
            return null
        }
    }

    /**
     * Clear shown version (called when app initializes - this allows new notifications)
     */
    clearShownVersion(): void {
        try {
            localStorage.removeItem(this.NOTIFICATION_SHOWN_KEY)
        } catch (error) {
            console.warn('Failed to clear shown version:', error)
        }
    }

    /**
     * Clear update notification
     */
    clearUpdate(): void {
        this.updateState({
            isUpdateAvailable: false,
            currentVersion: '',
            newVersion: '',
            isVisible: false
        })
    }

    /**
     * Get current notification state
     */
    getState(): UpdateNotificationState {
        return { ...this.state }
    }

    /**
     * Update state and notify listeners
     */
    private updateState(newState: UpdateNotificationState): void {
        this.state = newState
        this.listeners.forEach((listener) => listener(this.state))
    }

    /**
     * Cleanup resources
     */
    cleanup(): void {
        // No timeouts to cleanup since message stays until refresh
    }
}

// Singleton instance
export const updateNotificationService = new UpdateNotificationService()
