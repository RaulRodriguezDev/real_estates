import express from 'express'
import { addImage, admin, create, save, saveImage } from '../controllers/propertyController.js'
import { body } from 'express-validator'
import protectRoute from '../middleware/protectRoute.js'
import upload from '../middleware/addImage.js'

const router = express.Router()

router.get('/properties', protectRoute , admin)
router.get('/properties/create', protectRoute , create)
router.post('/properties/create',
    protectRoute,
    body('title').notEmpty().withMessage('Title is required'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({max: 120}).withMessage('Description must be maximum 120 characters long'),
    body('category').isNumeric().withMessage('Select at least one category'),
    body('rooms').isNumeric().withMessage('Select at least one room'),
    body('price').isNumeric().withMessage('Select at least one price range'),
    body('parkings').isNumeric().withMessage('Select at least one parking '),
    body('wc').isNumeric().withMessage('Select at least one wc'),
    body('latitude').notEmpty().withMessage('The location is required'),
    (req, res, next) => {
        console.log('This is the first middleware')
        next()
    },
    save
)
router.get('/properties/add-image/:id', protectRoute , addImage)
router.post('/properties/add-image/:id', protectRoute, upload.single('image'), saveImage )

export default router