import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protectRoute = async(req, res, next) => {

    const { _token } = req.cookies

    if(!_token) {
        return res.redirect('/auth/login')
    }

    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        const user = await User.scope('deleteSensibleInfo').findByPk(decoded.id)

        if(user){
            req.user = user
        } else {
            return res.redirect('/auth/login')
        }

    } catch (error) {
        
        return res.clearCookie('_token').redirect('/auth/login')
    }

    next()
}

export default protectRoute