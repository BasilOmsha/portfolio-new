import { useCallback, useEffect, useState } from 'react'

import { updateNotificationService } from '../../services/update-notification.ts'
import type { UpdateNotificationState } from '../../types/version.ts'

import './UpdateNotification.css'

const UpdateNotification = () => {
    const [notificationState, setNotificationState] = useState<UpdateNotificationState>({
        isUpdateAvailable: false,
        currentVersion: '',
        newVersion: '',
        isVisible: false
    })
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        const unsubscribe = updateNotificationService.subscribe(setNotificationState)
        return unsubscribe
    }, [])

    const handleRefresh = useCallback(async () => {
        if (isRefreshing) return

        setIsRefreshing(true)

        try {
            // Give user feedback that refresh is happening
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Force hard reload to get new version
            window.location.reload()
        } catch (error) {
            console.error('Refresh failed:', error)
            setIsRefreshing(false)
        }
    }, [isRefreshing])

    const handleDismiss = useCallback(() => {
        updateNotificationService.hideNotification()
    }, [])

    if (!notificationState.isUpdateAvailable || !notificationState.isVisible) {
        return null
    }

    return (
        <div className="update-notification" role="alert" aria-live="polite">
            <div className="update-notification-content">
                <div className="update-notification-icon">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 6V10L13 13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className="update-notification-text">
                    <h4>New Version Available</h4>
                    <p>
                        A new version ({notificationState.newVersion}) is available. Refresh to get
                        the latest features and improvements.
                    </p>
                </div>
                <div className="update-notification-actions">
                    <button
                        className="update-btn update-btn-primary"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        aria-label="Refresh to get new version"
                    >
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button
                        className="update-btn update-btn-secondary"
                        onClick={handleDismiss}
                        aria-label="Dismiss update notification"
                    >
                        Later
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateNotification
