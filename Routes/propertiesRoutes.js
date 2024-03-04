import express from 'express'
import { admin, create, save } from '../controllers/propertyController.js'
import { body } from 'express-validator'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/my-properties', protectRoute , admin)
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
    save
)

export default router