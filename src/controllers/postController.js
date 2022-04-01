import { getUrl } from '../services/api.urlMetadata.js'

import * as likeController from './likeController.js'
import { createInsertHashtag } from './hashtagController.js'

import { hashtagRepository } from '../repositories/hashtagRepository.js'
import { postRepository } from '../repositories/postRepository.js'

import { makeHashtagList } from '../helpers/hashtagHelper.js'


async function createPost(req, res, next) {
	const postInfo = req.body
	const userId = res.locals.userId
	const info = await getUrl(postInfo.link)

	const hashtags = makeHashtagList(postInfo.message)

	try {
		const postResult = await postRepository.createPost(info.url, info.title, info.description, info.image, userId, postInfo.message)

		if (hashtags !== null) {
			const postId = postResult.rows[0].id
			createInsertHashtag(hashtags, postId)
		}

		return res.status(201).send('Post created!')

	} catch (error) {
		next(error)
	}
}

async function getTimelinePosts(req, res, next) {
	const { locals: { userId } } = res
	const POSTS_LIMIT = 10

	try {
		const postList = await postRepository.findTimelinePosts({
			limit: POSTS_LIMIT,
			searcherId: userId,
		})
		
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

	try {
		const hashtags = makeHashtagList(message)
		
		const { rows: [post] } = await postRepository.findOnePost(id)

		if(!post) {
			return res.sendStatus(404)
		}
		if(post.userId != res.locals.userId) {
			return res.sendStatus(401)
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


export {
	createPost, 
	getTimelinePosts, 
	deletePost,
	updatePost,
}
