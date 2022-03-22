import cors from 'cors'
import express from 'express'

import router from './routers/index.js'

import personalizedMiddlewareError from './middlewares/personalizedMiddlewareError.js'
import serverMiddlewareError from './middlewares/serverMiddlewareError.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

app.use(personalizedMiddlewareError)
app.use(serverMiddlewareError)


export default app
