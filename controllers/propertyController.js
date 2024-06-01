import { validationResult } from 'express-validator'
import { Property, Price, Category } from '../models/index.js'

const admin = (req, res) => {
    res.render('properties/admin',{
        page: 'My properties',
    })
}

const create = async (req, res) => {

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/create',{
        page: 'Create property',
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: {}
    })
}

const save = async (req, res) => {
    let result = validationResult(req)

    if(!result.isEmpty()){
        console.log(req.body)
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])
        res.render('properties/create',{
            page: 'Create property',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: result.array(),
            data: req.body
        })
    }
    const { title, description, rooms, parkings, wc, street, latitude, longitude, price: priceId, category: categoryId } = req.body
    const { id: userId } = req.user

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
            categoryId,
            userId,
            image: ''
        })

        const { id: propertyId } = propertySaved
        console.log(propertyId)
        res.redirect(`/properties/add-image/${propertyId}`)
    } catch (error) {
        console.log(error)
    }
    
}

const addImage = async (req, res) => {

    const { id } = req.params
    const property = await Property.findByPk(id)

    if(!property){
        res.redirect('/properties')
    }

    if(property.published){
        res.redirect('/properties')
    }

    if(property.userId.toString() !== req.user.id.toString()){
        res.redirect('/properties')
    }

    res.render('properties/add-image',{
        page: `Add Image for ${property.title}`,
        property,
        csrfToken: req.csrfToken()
    })
}

export { admin, create, save, addImage }