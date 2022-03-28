import * as likeRepository from '../repositories/likeRepository.js'


async function getLikesPosts({ postList }) {
	const likesPromises = postList.map(({ postId }) => {
		return likeRepository.findLikesByPostId({ id: postId })
	})

	const likesList = await Promise.all(likesPromises)
	
	const likesPostsList = postList.map((post, index) => {
		return {
			...post,
			likes: likesList[index]
		}
	})
	
	return likesPostsList
}


async function addLike(req, res, next) {
	const { body: { postId } } = req
	const { locals: { userId } } = res

	try {
		const existentLike = await likeRepository.findUserLikeByPostId({
			postId,
			userId,
		})
		if (existentLike !== null) throw new Error()

		await likeRepository.insertLike({ userId, postId })

		return res.status(201).send('Like inserted!')
	} catch (error) {
		next(error)
	}
}


async function removeLike(req, res, next) {
	const { params: { postId } } = req
	const { locals: { userId } } = res

	try {
		const existentLike = await likeRepository.findUserLikeByPostId({
			postId,
			userId,
		})
		if (existentLike === null) throw new Error()

		await likeRepository.deleteLike({ userId, postId })

		return res.status(200).send('Like removed!')
	} catch (error) {
		next(error)
	}
}



export {
	getLikesPosts,
	addLike,
	removeLike,
}
