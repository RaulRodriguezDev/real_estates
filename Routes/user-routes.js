import express from 'express'
import { formForgotYourPassword, formLogin, formRegister, register, confirm, resetPassword, validateToken, newPassword, authenticate } from '../controllers/userController.js'

const router = express.Router()

router.get('/login', formLogin)
router.post('/login', authenticate)
router.get('/register', formRegister)
router.post('/register',register)
router.get('/forgot-password', formForgotYourPassword)
router.post('/forgot-password', resetPassword)
router.get('/confirm/:token', confirm)
router.get('/forgot-password/:token', validateToken)
router.post('/forgot-password/:token', newPassword)


export default router