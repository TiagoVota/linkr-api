import { Router } from 'express'

import * as postController from '../controllers/postController.js'

import authMiddleware from '../middlewares/authMiddleware.js'


const router = new Router()

router.get('/timeline', authMiddleware, postController.getTimelinePosts)

// router.post('', postController.controllerFunction)


export default router
