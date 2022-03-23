import { Router } from 'express'
import { signUp } from '../controllers/userController.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import userSchema from '../schemas/userSchema.js'

const userRouter = new Router()

userRouter.post('/sign-up', schemaValidation(userSchema), signUp)

export default userRouter
