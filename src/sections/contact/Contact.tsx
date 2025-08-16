import { useEffect, useRef, useState } from 'react'

import emailjs from '@emailjs/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'

import ContactExperience from '../../components/models/contact/ContactExperience.tsx'
import TitleHeader from '../../components/title-header/TitleHeader.tsx'
import { contactFormSchema, type ContactFormData } from '../../schemas/contactForm.ts'
import './Contact.css'

function Contact() {
    const formRef = useRef<HTMLFormElement>(null)
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            message: ''
        }
    })

    const onSubmit = async (): Promise<void> => {
        try {
            if (formRef.current) {
                await emailjs.sendForm(
                    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                    formRef.current,
                    import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
                )
                reset()
                toast.success('I received your message. Get back to you soon!')
            }
        } catch (error) {
            console.error('EmailJS error:', error)
            toast.error('Failed to send message. Please try again.')
        }
    }

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
            <section id="contact" className="contact-section">
                <div className="contact-container">
                    <TitleHeader title="💬 Get in Touch" />
                    <div className="contact-content">
                        <div className="contact-info-card">
                            <div className="contact-card-inner">
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="contact-form"
                                    noValidate
                                >
                                    <div className="form-field">
                                        <label htmlFor="name">Your name*</label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register('name')}
                                            placeholder="John Doe"
                                            className={errors.name ? 'error' : ''}
                                            aria-invalid={errors.name ? 'true' : 'false'}
                                        />
                                        {errors.name && (
                                            <span className="error-message" role="alert">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="email">Your Email*</label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email')}
                                            placeholder="john.doe@example.com"
                                            className={errors.email ? 'error' : ''}
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                        />
                                        {errors.email && (
                                            <span className="error-message" role="alert">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="message">Your Message*</label>
                                        <textarea
                                            id="message"
                                            {...register('message')}
                                            placeholder="How can I help you?"
                                            rows={5}
                                            className={errors.message ? 'error' : ''}
                                            aria-invalid={errors.message ? 'true' : 'false'}
                                        />
                                        {errors.message && (
                                            <span className="error-message" role="alert">
                                                {errors.message.message}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isValid}
                                        className="cta-wrapper"
                                        aria-label={
                                            isSubmitting ? 'Sending message...' : 'Send message'
                                        }
                                    >
                                        <div className="cta-button">
                                            <div className="bg-circle" />
                                            <p className="text">
                                                {isSubmitting ? (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <span>Sending </span>
                                                        <BeatLoader size={10} color="#ffffff" />
                                                    </div>
                                                ) : (
                                                    'Send Message'
                                                )}
                                            </p>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="contact-visual">
                            <div className="contact-3d-wrapper">
                                <ContactExperience />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
