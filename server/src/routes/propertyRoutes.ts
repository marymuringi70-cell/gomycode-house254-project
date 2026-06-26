import { Router } from 'express'
import { createProperty, deleteProperty, getProperties, getPropertyById, updateProperty } from '../controllers/propertyController.js'
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js'
import { memoryUpload } from '../middleware/uploadMiddleware.js'

export const propertyRouter = Router()

propertyRouter.get('/', getProperties)
propertyRouter.get('/:id', getPropertyById)
propertyRouter.post('/', authenticateUser, authorizeRoles('landlord', 'admin'), memoryUpload.array('images', 8), createProperty)
propertyRouter.put('/:id', authenticateUser, updateProperty)
propertyRouter.delete('/:id', authenticateUser, deleteProperty)