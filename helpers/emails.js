import nodemailer from 'nodemailer'
import { generateEmailContent } from './emailBodyGenerator.js'

const registerEmail = async (data) => {
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const { name, email, token } = data

    await transport.sendMail({
        from: 'RealEstates.com',
        to: email,
        subject: 'Verifiy your account in RealEstates.com',
        text: 'Verifiy your account in RealEstates.com',
        html: generateEmailContent(name, token, "register-email.html","confirm")

    })
}
const forgotPasswordEmail = async (data) => {
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const { name, email, token } = data

    await transport.sendMail({
        from: 'RealEstates.com',
        to: email,
        subject: 'Reset your password',
        text: 'Reset your password in Real Estates',
        html: generateEmailContent(name, token, "forgot-password-email.html","forgot-password")

    })
}

export { registerEmail, forgotPasswordEmail }