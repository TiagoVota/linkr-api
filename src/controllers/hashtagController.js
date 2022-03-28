import { hashtagRepository } from '../repositories/hashtagRepository.js'
import { getUrl } from "../services/api.urlMetadata.js"

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
		hashtags.map(tag => {
			tag.name = tag.name.replace("#", "")
	})

		res.send(hashtags)
	} catch (error) {
		next(error)
	}
}

async function selectHashtag(req, res) {
	const { id: hashtag } = req.params
	const hashtagName = '#'+hashtag
	try {
		const {rows:result} = await hashtagRepository.getHashtag(hashtagName)
		const post = []
		for (const [idx, postArray] of result.entries()) {
			const url = await getUrl(postArray.url)
			post.push({
				postId: result[idx].id,
				userId: result[idx].userId,
				hashtagName: result[idx].hashtagName,
    url: url.url,
    title: url.title,
    description: url.description,
    image: url.image,
    message: result[idx].message,
    picture: result[idx].picture,
    username: result[idx].username,
			})
		}
		res.send(post.reverse().slice(0, 20))
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
}

export {
	createInsertHashtag, getTrendingHashtags, selectHashtag
}