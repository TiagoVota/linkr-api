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


export {
	getLikesPosts,
}
