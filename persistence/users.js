import bcrypt from 'bcrypt'

const users = [
    {
        name: "Ivan",
        email: "raul.rodriguez.dev@gmail.com",
        confirmed: true,
        password: bcrypt.hashSync('Admin123*', 10)
    }
]

export default users