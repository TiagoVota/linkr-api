import { hashtagRepository } from '../repositories/hashtagRepository.js'

export async function getTrendingHashtags(req, res, next) {
	try {
		const hashtags = await hashtagRepository.getHashtags()

		res.send(hashtags)
	} catch (error) {
		next(error)
	}
}