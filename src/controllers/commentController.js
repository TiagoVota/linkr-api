import { commentRepository } from '../repositories/commentRepository.js'

export async function createComment(req, res, next) {
	const { authorId, text } = req.body
	const { id: postId } = req.params

	try {
		await commentRepository.createComment(text, authorId, postId)
		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

export async function getComments(req, res, next) {
	const { id: postId, userId } = req.params
	try {
		const comments = await commentRepository.getComments(postId, userId)
		res.send(comments)
	} catch (error) {
		next(error)
	}
}