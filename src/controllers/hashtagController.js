import { hashtagRepository } from "../repositories/hashtagRepository.js"
import { getUrl } from "../services/api.urlMetadata.js"

export async function getTrendingHashtags(req, res, next) {
  try {
    const hashtags = await hashtagRepository.getHashtags()

    res.send(hashtags)
  } catch (error) {
    next(error)
  }
}

export async function selectHashtag(req, res) {
	const { id: hashtagName } = req.params
	try {
		const {rows:result} = await hashtagRepository.getHashtag(hashtagName)
		const post = []
		for (const [idx, postArray] of result.entries()) {
			const url = await getUrl(postArray.url)
			post.push({
				userId: result[idx].userId,
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