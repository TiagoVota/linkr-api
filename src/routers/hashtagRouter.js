import { Router } from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'

const hashtagRouter = new Router()

hashtagRouter.use(authMiddleware)


export default hashtagRouter
