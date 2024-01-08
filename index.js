import express from 'express'
import userRoutes from './Routes/user-routes.js'
import propertiesRoutes from './Routes/propertiesRoutes.js'
import db from './config/db.js'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'

// Creating app
const app = express()
const port = process.env.PORT || 3000

//Database connection
try {
    await db.authenticate()
    db.sync()
    console.log('Connection successfully')
} catch (error) {
    console.log(error )
}

//Enable request form
app.use(express.urlencoded({extended: true}))

//Enable Cookie parser
app.use(cookieParser())

//Enable CSRF
app.use(csrf({cookie: true}))

//Routing
app.use('/auth',userRoutes)
app.use('/', propertiesRoutes)

//Enable Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Public folder
app.use(express.static('public'))


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
