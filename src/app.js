import cors from 'cors'
import express from 'express'

import {
	healthRouter,
	userRouter,
	postRouter,
	hashtagRouter,
	likeRouter,
} from './routers/healthRouter.js'

import personalizedMiddlewareError from './middlewares/personalizedMiddlewareError.js'
import serverMiddlewareError from './middlewares/serverMiddlewareError.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/health', healthRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/hashtags', hashtagRouter)
app.use('/likes', likeRouter)

app.use(personalizedMiddlewareError)
app.use(serverMiddlewareError)


export default app
