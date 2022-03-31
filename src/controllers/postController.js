import * as likeController from './likeController.js'

import { hashtagRepository } from '../repositories/hashtagRepository.js'
import { postRepository } from '../repositories/postRepository.js'
import { getUrl } from '../services/api.urlMetadata.js'
import { createInsertHashtag } from './hashtagController.js'

async function createPost(req, res, next) {
	const postInfo = req.body
	const userId = res.locals.userId
	const info = await getUrl(postInfo.link)

	let hashtags = []
	if (postInfo.message !== '') {
		hashtags = postInfo.message?.match(/#[a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÓÔÕÚÇÑ0-9]+/gi)
	}

	try {
		const postResult = await postRepository.createPost(info.url, info.title, info.description, info.image, userId, postInfo.message)

		if (hashtags !== null) {
			const postId = postResult.rows[0].id
			createInsertHashtag(hashtags, postId)
		}

	} catch (error) {
		next(error)
	}
	res.status(201).send('Created')
}

async function getTimelinePosts(req, res, next) {
	const POSTS_LIMIT = 20

	try {
		const postList = await postRepository.findPosts({ limit: POSTS_LIMIT })
		
		const likesPostsList = await likeController.getLikesPosts({ postList })

		return res.status(200).send(likesPostsList)

	} catch (error) {
		next(error)
	}
}

async function deletePost(req, res, next) {
	const { id } = req.params

	try {
		const result = await postRepository.selectPost(id, res.locals.userId)
		if(result.rowCount === 0) {
			return res.sendStatus(401)
		}
		await postRepository.deletePost(id)
		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

async function updatePost(req, res, next) {
	const { id } = req.params
	const { message } = req.body
	const isUpdate = true

	let hashtags = []
	if (message !== '') {
		hashtags = message?.match(/#[a-z]+/gi)
	}

	try {
		const { rows: [post] } = await postRepository.findOnePost(id)

		if(!post) {
			return res.sendStatus(404)
		}
		if(post.userId != res.locals.userId) {
			return res.sendStatus(422)
		}

		await postRepository.updatePost(id, message)

		if (hashtags !== []) {
			createInsertHashtag(hashtags, id, isUpdate)
		} else {
			hashtagRepository.deleteHashtagsPosts(hashtags, id)
		}

		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

async function createRepost(req, res, next) {
	const { userId } = res.locals
	const { postId } = req.body

	try {

		await postRepository.insertRepost(userId, postId)
		
		res.status(201).send('Reposted!')

	} catch (error) {
		next(error)
	}
}

async function getReposts(req, res, next) {
	const { userId } = res.locals
	
	try {
		
		const { rows } = await postRepository.selectReposts(userId)

		//console.log(rows)

		res.sendStatus(200)

	} catch (error) {
		next(error)
	}
}

async function existingRepost(req, res, next) {
	const { userId } = res.locals
	const { id } = req.params

	try {
		const {rows: [existingRepost]} = await postRepository.selectRepost(userId, id)
		if(existingRepost) {
			return res.send(true)
		}
		res.send(false)
	} catch (error) {
		next(error)
	}
}

async function deleteRepost(req, res, next) {
	const {id} = req.params
	const { userId } = res.locals

	try {
		
		const result = await postRepository.selectRepost(userId, id)
		if(result.rowCount === 0) {
			return res.sendStatus(401)
		}
		await postRepository.removeRepost(userId, id)
		res.status(200).send('Deleted!')
	} catch (error) {
		next(error)
	}
}


export {
	createPost, 
	getTimelinePosts, 
	deletePost,
	updatePost,
	createRepost,
	getReposts,
	existingRepost,
	deleteRepost
}
