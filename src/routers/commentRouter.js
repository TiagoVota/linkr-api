import { Router } from 'express'
import { createComment, getComments } from '../controllers/commentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import commentSchema from '../schemas/commentSchema.js'

const commentRouter = new Router()

commentRouter.use(authMiddleware)
commentRouter.post('/posts/:id/comments', schemaValidation(commentSchema), createComment)
commentRouter.get('/posts/:id/comments', getComments)

export default commentRouter
