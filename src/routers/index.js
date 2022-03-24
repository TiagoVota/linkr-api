import { Router } from 'express'

import healthRouter from './healthRouter.js'
import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import postRouter from './postRouter.js'
import hashtagRouter from './hashtagRouter.js'
import likeRouter from './likeRouter.js'


const router = Router()

router.use(authRouter)
router.use('/health', healthRouter)
router.use('/users', userRouter)
router.use(postRouter)
router.use(hashtagRouter)
router.use('/likes', likeRouter)

router.use(userRouter)


export default router
