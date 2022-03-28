import { Router } from 'express'
import { createPost, deletePost, getTimelinePosts, updatePost } from '../controllers/postController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import postSchema from '../schemas/postSchema.js'
import updatePostSchema from '../schemas/updatePostSchema.js'

const postRouter = new Router()

postRouter.use(authMiddleware)
postRouter.post('/posts', schemaValidation(postSchema), createPost)
postRouter.get('/posts/timeline', getTimelinePosts)
postRouter.delete('/posts/:id', deletePost)
postRouter.put('/posts/:id', schemaValidation(updatePostSchema), updatePost)

export default postRouter
