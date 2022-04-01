import * as followRepository from '../repositories/followRepository.js'

import ExistentFollowError from '../errors/ExistentFollowError.js'
import NoFollowerError from '../errors/NoFollowerError.js'


async function followUser(req, res, next) {
	const { body: { followId } } = req
	const { locals: { userId } } = res

	try {
		const existentFollow = await followRepository.findUserFollowByFollowerId({
			followId,
			followerId: userId,
		})
		if (existentFollow !== null) throw new ExistentFollowError()

		await followRepository.insertFollow({
			followId,
			followerId: userId,
		})

		return res.status(201).send('Follow make!')

	} catch (error) {
		next(error)
	}
}


async function unfollowUser(req, res, next) {
	const { params: { unfollowId } } = req
	const { locals: { userId } } = res

	try {
		const existentFollow = await followRepository.findUserFollowByFollowerId({
			followId: unfollowId,
			followerId: userId,
		})
		if (existentFollow === null) throw new NoFollowerError()

		await followRepository.deleteFollow({
			followId: unfollowId,
			followerId: userId,
		})

		return res.status(200).send('Follow removed!')

	} catch (error) {
		next(error)
	}
}



export {
	followUser,
	unfollowUser,
}
