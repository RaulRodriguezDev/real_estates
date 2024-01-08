import jwt from 'jsonwebtoken'

const generateId = () => Math.random().toString(32).substring(2) + Date.now().toString(32)
const generateJWT = data => {
    const payload = {
        id: data.user,
        name: data.name
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
}

export { generateId, generateJWT }