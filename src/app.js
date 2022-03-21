import cors from 'cors'
import express from 'express'

import healthRouter from './routers/healthRouter.js'
import exampleRouter from './routers/exampleRouter.js'

import backMiddlewareError from './middlewares/backMiddlewareError.js'
import serverMiddlewareError from './middlewares/serverMiddlewareError.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/health', healthRouter)
app.use('/example', exampleRouter)

app.use(backMiddlewareError)
app.use(serverMiddlewareError)


export default app
