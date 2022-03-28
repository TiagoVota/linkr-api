import { hashtagRepository } from '../repositories/hashtagRepository.js'

async function createInsertHashtag(hashtags, postId, isUpdate) {
	try {
		let filteredHashtags = hashtags
		let hashtagsFoundId = []
    
		const resultHashtag = await hashtagRepository.searchHashtag(hashtags)
		let hashtagsFound = resultHashtag.filter(hashtag => hashtag.rowCount !== 0)

		if (hashtagsFound !== []) {
			let hashtagsFoundName = []

			for(let i = 0; i < hashtagsFound.length; i++) {
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

		res.send(hashtags)
	} catch (error) {
		next(error)
	}
}

export {
	createInsertHashtag, getTrendingHashtags,
}
