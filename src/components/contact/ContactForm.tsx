import { useMemo, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'

import contactService from '@/api/contact-service.ts'
import { contactFormSchema, type ContactFormData } from '../../schemas/contactForm.ts'

function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null)

    const RECAPTCHA_SITE_KEY = useMemo(() => import.meta.env.VITE_APP_SITE_KEY, [])
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            message: '',
            recaptchaToken: ''
        }
    })

    const onSubmit = async (data: ContactFormData): Promise<void> => {
        try {
            const isFormValid = await trigger()
            if (!isFormValid) return

            const result = await contactService.sendMessage({
                name: data.name,
                email: data.email,
                message: data.message,
                recaptchaToken: data.recaptchaToken
            })

            if (result.success) {
                reset()
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset()
                }
                toast.success('I received your message. Get back to you soon!')
            } else {
                toast.error(result.message || 'Failed to send message. Please try again.')
            }
        } catch (error) {
            console.error('Contact service error:', error)
            toast.error('Failed to send message. Please try again.')
        }
    }

    const handleRecaptchaChange = (token: string | null) => {
        setValue('recaptchaToken', token || '', { shouldValidate: true })
    }

    const handleRecaptchaExpired = () => {
        setValue('recaptchaToken', '', { shouldValidate: true })
        if (recaptchaRef.current) {
            recaptchaRef.current.reset()
        }
    }
    return (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
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
            <div className="form-field">
                <ReCAPTCHA
                    className="g-recaptcha"
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                    onExpired={handleRecaptchaExpired}
                    theme="dark"
                />
                {errors.recaptchaToken && (
                    <span className="error-message" role="alert">
                        {errors.recaptchaToken.message}
                    </span>
                )}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="cta-wrapper"
                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
            >
                <div className="cta-button">
                    <div className="bg-circle" />
                    <span className="text">
                        {isSubmitting ? (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <span>Sending </span>
                                <BeatLoader size={10} color="#045e01ff" />
                            </div>
                        ) : (
                            'Send Message'
                        )}
                    </span>
                </div>
            </button>
        </form>
    )
}

export default ContactForm
