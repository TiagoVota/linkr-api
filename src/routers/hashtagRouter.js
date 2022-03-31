import { Router } from 'express'
import { getTrendingHashtags, selectHashtag } from '../controllers/hashtagController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const hashtagRouter = new Router()

hashtagRouter.use(authMiddleware)
hashtagRouter.get('/hashtags', getTrendingHashtags)
hashtagRouter.get('/hashtags/:id', selectHashtag)


export default hashtagRouter
