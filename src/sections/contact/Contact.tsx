import { useEffect, useRef, useState } from 'react'

import { Toaster } from 'react-hot-toast'

import ContactForm from '@/components/contact/ContactForm.tsx'
import ContactExperience from '../../components/models/contact/ContactExperience.tsx'
import TitleHeader from '../../components/title-header/TitleHeader.tsx'

import useHideModel from '@/hooks/useHideModel.ts'

import './Contact.css'

function Contact() {
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    const contactRef = useRef<HTMLElement>(null)
    const timeoutRef = useRef<number | null>(null)

    const isModelVisible = useHideModel(contactRef, timeoutRef)

    useEffect(() => {
        const canvas = document.querySelector('canvas')
        const contactSection = document.querySelector('.contact-3d-wrapper') as HTMLElement
        const targetElement = contactSection || canvas

        if (targetElement) {
            targetElement.style.cursor = isMouseDown ? 'grabbing' : 'grab'

            const handleMouseDown = () => setIsMouseDown(true)
            const handleMouseUp = () => setIsMouseDown(false)

            targetElement.addEventListener('mousedown', handleMouseDown)
            document.addEventListener('mouseup', handleMouseUp)

            return () => {
                targetElement.removeEventListener('mousedown', handleMouseDown)
                document.removeEventListener('mouseup', handleMouseUp)
                targetElement.style.cursor = 'default' // Reset cursor
            }
        }
    }, [isMouseDown])

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: 'var(--color-black-100)',
                        color: 'var(--color-white-50)',
                        border: '1px solid var(--color-black-50)',
                        borderRadius: '12px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '500'
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#ffffff'
                        }
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff'
                        }
                    }
                }}
            />
            <section id="contact" className="contact-section" ref={contactRef}>
                <div className="contact-container">
                    <TitleHeader title="💬 Get in Touch" />
                    <div className="contact-content">
                        <div className="contact-info-card">
                            <div className="contact-card-inner">
                                <ContactForm />
                            </div>
                        </div>

                        <div className="contact-visual">
                            <div className="contact-3d-wrapper">
                                {isModelVisible ? (
                                    <ContactExperience />
                                ) : (
                                    <div style={{ width: '100%', height: '100%' }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
