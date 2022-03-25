import { Router } from 'express'
import { getUserPosts, signUp } from '../controllers/userController.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import userSchema from '../schemas/userSchema.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = new Router()

userRouter.post('/sign-up', schemaValidation(userSchema), signUp)
userRouter.get('/user/:id', authMiddleware, getUserPosts)

export default userRouter
