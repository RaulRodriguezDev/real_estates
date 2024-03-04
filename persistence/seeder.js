import db from '../config/db.js'
import categories from './categories.js'
import { Category, Price, Property, User} from '../models/index.js'
import prices from './prices.js'
import { exit } from 'node:process'
import users from './users.js'

const importData = async () => {
    try {

        await db.authenticate()
        await db.sync()

        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users)
        ]
        )
        console.log("Data imported successfully")
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}

const deleteData = async () => {
    try {

        await Promise.all([
            Category.destroy({ truncate: true }),
            Price.destroy({ where: {}, truncate: true })
        ])
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '-i') {
    importData()
}

if (process.argv[2] === '-d') {
    deleteData()
}