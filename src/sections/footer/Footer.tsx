import type React from 'react'

import { contactInfo } from '../../constants'
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-terms">
                    <p>Developer Profile</p>
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
    )
}

export default Footer
