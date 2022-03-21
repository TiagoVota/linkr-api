import { Router } from 'express'

import * as exampleController from '../controllers/exampleController.js'


const router = new Router()

router.post('', exampleController.controllerFunction)


export default router
