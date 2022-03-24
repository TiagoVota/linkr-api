import { Router } from 'express'
import { createPost } from '../controllers/postController.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import postSchema from '../schemas/postSchema.js'

const postRouter = new Router()

postRouter.post('/posts', schemaValidation(postSchema), createPost)

export default postRouter