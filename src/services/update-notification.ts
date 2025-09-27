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

    /**
     * Subscribe to notification state changes
     */
    subscribe(listener: NotificationListener): () => void {
        this.listeners.add(listener)

        // Send current state immediately
        listener(this.state)

        return () => {
            this.listeners.delete(listener)
        }
    }

    /**
     * Show update notification
     */
    showUpdateNotification(currentVersion: string, newVersion: string): void {
        this.updateState({
            isUpdateAvailable: true,
            currentVersion,
            newVersion,
            isVisible: true
        })
    }

    /**
     * Hide update notification
     */
    hideNotification(): void {
        this.updateState({
            ...this.state,
            isVisible: false
        })
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
}

// Singleton instance
export const updateNotificationService = new UpdateNotificationService()
