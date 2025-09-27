import type React from 'react'
import { useState } from 'react'

import { contactInfo } from '../../constants'

import './Footer.css'

const Footer: React.FC = () => {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)

    const openPrivacyModal = () => setShowPrivacyModal(true)
    const closePrivacyModal = () => setShowPrivacyModal(false)

    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-terms">
                        <button className="privacy-link" onClick={openPrivacyModal}>
                            Privacy Policy
                        </button>
                    </div>
                    <div className="footer-socials">
                        {contactInfo.socials.map((social, index) => (
                            <div key={index} className="footer-icon">
                                <a href={social.url} target="_blank" rel="noopener noreferrer">
                                    <img src={social.icon} alt={`${social.name} icon`} />
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="footer-copyright">
                        <p>© 2025 Basil Omsha. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {showPrivacyModal && (
                <div className="modal-overlay" onClick={closePrivacyModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Privacy Policy</h2>
                            <button className="modal-close" onClick={closePrivacyModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <h3>Cookie Usage</h3>
                            <p>
                                This website uses cookies solely for CAPTCHA functionality to
                                prevent spam and ensure security.
                            </p>

                            <h3>Contact Form Data</h3>
                            <p>When you submit the contact form:</p>
                            <ul>
                                <li>
                                    Your name and email address are collected only to identify who
                                    to reply to
                                </li>
                                <li>No data is stored in any database</li>
                                <li>
                                    Messages are sent directly via EmailJS service without server
                                    storage
                                </li>
                                <li>
                                    Information is used exclusively for responding to your inquiry
                                </li>
                                <li>No personal information is retained after responding</li>
                            </ul>

                            <h3>Third-Party Services</h3>
                            <p>
                                This site uses EmailJS to send contact form submissions directly to
                                email without storing data on our servers.
                            </p>

                            <h3>Data Protection</h3>
                            <p>
                                Your privacy is important. This site does not track, store, or share
                                your personal information with third parties beyond the email
                                delivery service.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Footer
