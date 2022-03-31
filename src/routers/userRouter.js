import { Router } from 'express'
import { getUserPosts, signUp, getUsers } from '../controllers/userController.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import userSchema from '../schemas/userSchema.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = new Router()

userRouter.get('/users', authMiddleware, getUsers)
userRouter.get('/users/:id', authMiddleware, getUserPosts)
userRouter.post('/sign-up', schemaValidation(userSchema), signUp)

export default userRouter
