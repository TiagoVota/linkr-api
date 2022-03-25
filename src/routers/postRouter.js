import { Router } from 'express'
import { createPost, getTimelinePosts } from '../controllers/postController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import postSchema from '../schemas/postSchema.js'

const postRouter = new Router()

postRouter.use(authMiddleware)
postRouter.post('/posts', schemaValidation(postSchema), createPost)
postRouter.get('/timeline', getTimelinePosts)

export default postRouter
