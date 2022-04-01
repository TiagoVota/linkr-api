import { Router } from 'express'
import { createPost, createRepost, deletePost, deleteRepost, existingRepost, getTimelinePosts, numberReposts, updatePost } from '../controllers/postController.js'
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
postRouter.get('/posts/repost/:id', existingRepost)
postRouter.post('/posts/repost', createRepost)
postRouter.delete('/posts/repost/:id', deleteRepost)
postRouter.get('/posts/repost/count/:id', numberReposts)

export default postRouter
