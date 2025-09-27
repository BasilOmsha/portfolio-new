import { useEffect, useState } from 'react'

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

    useEffect(() => {
        const unsubscribe = updateNotificationService.subscribe(setNotificationState)

        return () => {
            unsubscribe()
            updateNotificationService.cleanup()
        }
    }, [])

    if (!notificationState.isUpdateAvailable || !notificationState.isVisible) {
        return null
    }

    return (
        <div
            className={`update-notification ${notificationState.isVisible ? 'visible' : ''}`}
            role="status"
            aria-live="polite"
        >
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
                            d="M4 10L8 14L16 6"
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
                        A new version is available. Please refresh your browser to get the latest
                        features and improvements.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UpdateNotification
