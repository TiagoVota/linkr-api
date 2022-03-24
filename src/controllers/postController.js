import * as postRepository from '../repositories/postRepository.js'


async function getTimelinePosts(req, res, next) {
	const POSTS_LIMIT = 20

	try {
		const postList = await postRepository.findPosts({ limit: POSTS_LIMIT })

		return res.status(200).send(postList)

	} catch (error) {
		next(error)
	}
}


export {
	getTimelinePosts,
}
