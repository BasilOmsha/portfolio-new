import type React from 'react'
import { useEffect, useState } from 'react'
import './CookieConsent.css'

const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        const cookieNotified = localStorage.getItem('cookieNotified')
        if (!cookieNotified) {
            setShowBanner(true)
        }
    }, [])

    const acknowledgeCookies = () => {
        localStorage.setItem('cookieNotified', 'true')
        setShowBanner(false)
    }

    if (!showBanner) return null

    return (
        <div className="cookie-consent-banner">
            <div className="cookie-consent-content">
                <div className="cookie-consent-text">
                    <p>
                        <strong>Cookie Notice:</strong> This website uses essential cookies required
                        for CAPTCHA security features and spam prevention. These functional cookies
                        are necessary for the proper operation of our contact form and cannot be
                        disabled.
                    </p>
                </div>
                <div className="cookie-consent-buttons">
                    <button className="cookie-btn cookie-acknowledge" onClick={acknowledgeCookies}>
                        Understood
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CookieConsent
