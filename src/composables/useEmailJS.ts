import emailjs from 'emailjs-com'
import { ref } from 'vue'

export function useEmailJS() {
  const sending = ref(false)
  const success = ref(false)
  const error = ref<string | null>(null)

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

  async function sendEmail(templateId: string, params: Record<string, any>) {
    sending.value = true
    success.value = false
    error.value = null
    try {
      if (!serviceId || !publicKey) {
        throw new Error('EmailJS Service ID or Public Key is not configured in environment variables')
      }
      await emailjs.send(serviceId, templateId, params, publicKey)
      success.value = true
    } catch (err: any) {
      error.value = err.text || err.message || 'Failed to send email via EmailJS'
      throw err
    } finally {
      sending.value = false
    }
  }

  return {
    sending,
    success,
    error,
    sendEmail
  }
}
