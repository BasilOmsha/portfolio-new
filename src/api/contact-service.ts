import { type ContactFormData } from '../schemas/contactForm.ts'
import api from './index.ts'

export interface ContactResponse {
    success: boolean
    message: string
}

interface ContactService {
    sendMessage: (contactData: ContactFormData) => Promise<ContactResponse>
}

const contactService: ContactService = {
    sendMessage: async (contactData) => {
        const response = await api.post('/contact', {
            name: contactData.name,
            email: contactData.email,
            message: contactData.message,
            recaptchaToken: contactData.recaptchaToken
        })

        return response.data
    }
}

export default contactService
export type { ContactService }
