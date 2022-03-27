import { Router } from 'express'
import { getTrendingHashtags } from '../controllers/hashtagController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const hashtagRouter = new Router()

hashtagRouter.use(authMiddleware)
hashtagRouter.get('/hashtags', getTrendingHashtags)


export default hashtagRouter
