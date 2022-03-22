import { Router } from 'express'

import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import postRouter from './postRouter.js'
import hashtagRouter from './hashtagRouter.js'
import likeRouter from './likeRouter.js'


const router = Router()

router.use(authRouter)
router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/hashtags', hashtagRouter)
router.use('/likes', likeRouter)


export default router
