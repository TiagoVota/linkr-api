import * as likeController from './likeController.js'

import { hashtagRepository } from '../repositories/hashtagRepository.js'
import { postRepository } from '../repositories/postRepository.js'

async function createInsertHashtag(hashtags, postId, isUpdate) {
	try {
		let filteredHashtags = hashtags
		let hashtagsFoundId = []

		const resultHashtag = await hashtagRepository.searchHashtag(hashtags)
		let hashtagsFound = resultHashtag.filter(hashtag => hashtag.rowCount !== 0)

		if (hashtagsFound !== []) {
			let hashtagsFoundName = []

			for (let i = 0; i < hashtagsFound.length; i++) {
				hashtagsFoundName.push(hashtagsFound[i].rows[0].name)
				hashtagsFoundId.push(hashtagsFound[i].rows[0].id)
			}

			filteredHashtags = hashtags.filter(hashtag => !hashtagsFoundName.includes(hashtag))
		}

		const resultHashtagsPostsId = await hashtagRepository.searchHashtagsPosts(postId)

		let hashtagsPostsId = []
		resultHashtagsPostsId.rows.forEach((id, index) => {
			hashtagsPostsId.push(id.hashtagId)
		})

		let filteredHashtagsFoundId = hashtagsFoundId.filter(id => !hashtagsPostsId.includes(id))

		await hashtagRepository.insertHashtag(filteredHashtags, filteredHashtagsFoundId, postId, isUpdate)

		if (isUpdate) {
			hashtagRepository.deleteHashtagsPosts(hashtags, postId)
		}
	} catch (error) {
		console.log(error)
	}
}

async function getTrendingHashtags(req, res, next) {
	try {
		const hashtags = await hashtagRepository.getHashtags()
		hashtags.map(tag => {
			tag.name = tag.name.replace('#', '')
		})

		res.send(hashtags)
	} catch (error) {
		next(error)
	}
}

async function selectHashtag(req, res, next) {
	const { locals: { userId } } = res
	const { id: hashtag } = req.params
	const hashtagName = '#' + hashtag
	const POST_LIMIT = 10

	try {
		const posts = await hashtagRepository.getHashtagPosts({
			searcherId: userId,
			name: hashtagName,
			limit: POST_LIMIT,
		})
		const { rows } = await postRepository.selectRepostsByHashtag({name: hashtagName})

		const postsConcat = posts.concat(rows)
		const postList = postsConcat.sort((a, b) => b.createDate - a.createDate)

		const likesPostsList = await likeController.getLikesPosts({ postList })

		return res.status(200).send(likesPostsList)

	} catch (error) {
		next(error)
	}
}

export {
	createInsertHashtag,
	getTrendingHashtags,
	selectHashtag,
}
