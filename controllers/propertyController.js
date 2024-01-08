import { validationResult } from 'express-validator'
import Category from '../models/Category.js'
import Price from '../models/Price.js'
import Property from '../models/Property.js'

const admin = (req, res) => {
    res.render('properties/admin',{
        page: 'My properties',
        navbar: true
    })
}

const create = async (req, res) => {

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/create',{
        page: 'Create property',
        navbar: true,
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: {}
    })
}

const save = async (req, res) => {
    let result = validationResult(req)

    if(!result.isEmpty()){
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])
        res.render('properties/create',{
            page: 'Create property',
            navbar: true,
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: result.array(),
            data: req.body
        })
        
        const { title, description, rooms, parkings, wc, street, latitude, longitude, price: priceId, category: categoryId } = req.body

        try {
            const propertySaved = await Property.create({
                title,
                description,
                rooms,
                parkings,
                wc,
                street,
                latitude,
                longitude,
                priceId,
                categoryId
            })
        } catch (error) {
            
        }
    }
}

export { admin, create, save }