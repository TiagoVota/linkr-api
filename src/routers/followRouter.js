import { Router } from 'express'

import * as followController from '../controllers/followController.js'
import authMiddleware from '../middlewares/authMiddleware.js'


const router = new Router()

router.use(authMiddleware)

router.post('', followController.followUser)

router.delete('/:unfollowId', followController.unfollowUser)


export default router
