import { Router } from 'express'
import { login } from '../controllers/authController.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import { authSchema } from '../schemas/authSchema.js'

const authRouter = new Router()

authRouter.post('/login', schemaValidation(authSchema), login)

export default authRouter
