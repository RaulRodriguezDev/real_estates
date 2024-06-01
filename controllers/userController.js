import { check, validationResult } from 'express-validator'
import User from '../models/User.js'
import { generateId, generateJWT } from '../helpers/tokens.js'
import { forgotPasswordEmail, registerEmail } from '../helpers/emails.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const formLogin = (req, res) => {
    res.render('auth/login',{
        page: "Login",
        csrfToken: req.csrfToken()
    })
}

const authenticate = async (req, res) => {
    await check('email').isEmail().withMessage('The email does not look like a valid E-mail').run(req)
    await check('password').notEmpty().withMessage('The password must not be empty').run(req)

    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/login',{
            page: 'Login',
            errors: result.array(),
            csrfToken: req.csrfToken()
        })
    }

    const { email, password} = req.body

    const user = await User.findOne({where: {email}})

    if(!user){
        return res.render('auth/login',{
            page: 'Login',
            errors: [{msg: 'User doesn\'t exist'}],
            csrfToken: req.csrfToken()
        })
    }

    if(!user.confirmed){
        return res.render('auth/login',{
            page: 'Login',
            errors: [{msg: 'You must confirm your account first'}],
            csrfToken: req.csrfToken()
        })
    }

    if(!user.verifyPassword(password )){
        return res.render('auth/login',{
            page: 'Login',
            errors: [{msg: 'The password is incorrect'}],
            csrfToken: req.csrfToken()
        })
    }

    const token = generateJWT({user: user.id, name: user.name})

    return res.cookie('_token', token, {
    httpOnly: true,
    }).redirect('/properties')

}
const formRegister = (req, res) => {
    res.render('auth/register',{
        page: "Create Account",
        csrfToken: req.csrfToken()
    })
}

const register = async (req, res) => {
    //Validations
    await check('name').notEmpty().withMessage('The Name cannot be empty').run(req)
    await check('email').isEmail().withMessage('The email does not look like a valid E-mail').run(req)
    await check('password').isLength({min: 6}).withMessage('The password must be at least 6 characters').run(req)
    await check('confirm_password').matches(req.body.password).withMessage('Password and Confirm Password doesn\'t match').run(req)

    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/register',{
            page: 'Create Account',
            errors: result.array(),
            user: req.body,
            csrfToken: req.csrfToken()
        })
    }

    const userExist = await User.findOne({ where: {email: req.body.email}})

    if(userExist) {
        return res.render('auth/register',{
            page: 'Create Account',
            errors: [{msg: 'User already exist.  Please Sign in'}],
            user: req.body,
            csrfToken: csrfToken()
        })
    }

    req.body.token = generateId()

    const user = await User.create(req.body)
    
    registerEmail({
        name: user.name,
        email: user.email,
        token: user.token
    })

    res.render('templates/message',{
        page: 'Account created successfully',
        message: 'We\'ve sent you a confirmation email.'
    })
}

const confirm = async (req, res) => {
    const {token} = req.params

    console.log(token)

    const user = await User.findOne({where: {token}})

    if(!user){
        return res.render('auth/confirm-account', {
            page: 'Invalid Token',
            message: 'The token is invalid. There was an error triying to confirm your account',
            error: true
        })
    }

    user.token = null
    user.confirmed = true

    await user.save()

    return res.render('auth/confirm-account', {
        page: 'Account confirmed',
        message: 'Your account has been confirmed successfully',
        error: false
    })
}

const formForgotYourPassword = (req, res) => {
    res.render('auth/forgotPassword',{
        page: "Get your Real Estate's access again",
        csrfToken: req.csrfToken()
    })
}

const resetPassword = async (req, res) => {

    await check('email').isEmail().withMessage('The email does not look like a valid E-mail').run(req)
    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/forgotPassword',{
            page: "Get your Real Estate's acesss again",
            csrfToken: req.csrfToken(),
            errors: result.array(),
        })
    }

    const user = await User.findOne({ where: {email: req.body.email}})

    if(!user){
        return res.render({
            page: "Get your Real Estate's acesss again",
            csrfToken: req.csrfToken(),
            errors: [{msg: 'The email is not asigned to any user'}] 
        })
    }

    user.token = generateId()
    await user.save()

    forgotPasswordEmail({
        name: user.name,
        email: user.email,
        token: user.token
    })

    res.render('templates/message',{
        page: 'Restablish your password',
        message: "We've sent you an email with the instructions to reset your password"
    })


}

const validateToken = (req, res) => {
    const {token} = req.params

    const user = User.findOne({where:{token}})

    if(!user){
        return res.render('auth/confirm-account', {
            page: 'Invalid Token',
            message: 'The token is invalid. There was an error triying to reset your password.',
            error: true
        })
    }

    res.render('auth/reset-password',{
        page: 'Reset your password',
        csrfToken: req.csrfToken()
    })
}

const newPassword = async (req, res) => {
    await check('password').isLength({min: 6}).withMessage('The password must be at least 6 characters').run(req)

    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/reset-password',{
            page: 'Reset your password',
            errors: result.array(),
            csrfToken: req.csrfToken()
        })
    }

    const {token} = req.params
    const {password} = req.body

    const user = await User.findOne({where:{token}})

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.token = null

    await user.save()

    res.render('auth/confirm-account',{
        page:'Password has been restablished',
        message: 'Your password has been changed successfully'
    })
}

export {
    authenticate,
    formLogin,
    formRegister,
    formForgotYourPassword,
    register,
    confirm,
    resetPassword,
    validateToken,
    newPassword
}