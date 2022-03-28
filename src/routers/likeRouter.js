import { Router } from 'express'

import * as likeController from '../controllers/likeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'


const router = new Router()

router.use(authMiddleware)

router.post('/like', likeController.addLike)

router.delete('/dislike/:postId', likeController.removeLike)


export default router
