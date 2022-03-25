import { Router } from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'

const hashtagRouter = new Router()

hashtagRouter.use(authMiddleware)


export default hashtagRouter
