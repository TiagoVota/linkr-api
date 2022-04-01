import { getUrl } from '../services/api.urlMetadata.js'

import * as likeController from './likeController.js'
import { createInsertHashtag } from './hashtagController.js'

import * as followRepository from '../repositories/followRepository.js'
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
	const OFFSET = req.query.offset

	try {		
		
		const userFollow = await followRepository.findUserFollows({ id: userId })
		
		const posts = await postRepository.findTimelinePosts({
			searcherId: userId,
			limit: POSTS_LIMIT,
			offset: OFFSET
		})
		const { rows } = await postRepository.selectReposts({ searcherId: userId, limit: POSTS_LIMIT, offset: OFFSET })
		
		const postsConcat = posts.concat(rows)
		const postList = postsConcat.sort((a, b) => b.createDate - a.createDate).slice(0, 10)

		const noFollows = Boolean(userFollow === null)
		const NoPosts = Boolean(postList.length === 0)
		if (noFollows && NoPosts) {
			return res.status(200).send('The user has no follows!')
		}

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

async function numberReposts(req, res, next) {
	const {id} = req.params

	try {
		
		const {rows: list} = await postRepository.countReposts(id)
		const numberReposts = list[0].count
		
		res.send(numberReposts).status(200)

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
	existingRepost,
	deleteRepost,
	numberReposts
}
