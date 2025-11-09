import axios from "axios";

const apiURL = process.env.NODE_ENV === 'production' ? 'https://api.nextjs-mongo-passport-template.com' : '//localhost:3001'

const api = axios.create({
    baseURL: apiURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default {
    async login(email: string, password: string) {
        const response = await api.post('/api/next-js-mongo-passport/login', { email, password })
        return response.data
    },
    async logout() {
        const response = await api.post('/api/next-js-mongo-passport/logout')
        return response.data
    },
    async getCurrentUser(currentPath: string) {
        const response = await api.get('/api/next-js-mongo-passport/user', { params: { currentPath } })
        return response.data
    },
    async sendEmail(messageInfo: any) {
        const response = await api.post('/api/next-js-mongo-passport/send-email', messageInfo)
        return response.data
    },
    async createAccount(newAccountInfo: any) {
        const response = await api.post('/api/next-js-mongo-passport/create-account', newAccountInfo)
        return response.data
    },
    async setEmailVerificationToken(email: any) {
        const response = await api.post('/api/next-js-mongo-passport/set-email-verification-token', { email })
        return response.data
    },
    async checkExistingAccountEmails(email: any) {
        const response = await api.post('/api/next-js-mongo-passport/check-existing-account-emails', [email])
        return response.data
    },
    async setEmailResetToken(email: any) {
        const response = await api.post('/api/next-js-mongo-passport/reset-password-request', { email })
        return response.data
    },
    async checkEmailAndResetToken(email: any, resetToken: any) {
        const response = await api.post('/api/next-js-mongo-passport/check-email-and-reset-token', { email, resetToken })
        return response.data
    },
    async resetPassword(email: any, resetCode: any, newPassword: any) {
        const response = await api.post('/api/next-js-mongo-passport/reset-password', { email, resetCode, newPassword })
        return response.data
    },
}