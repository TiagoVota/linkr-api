import bcrypt from 'bcrypt'

import * as likeController from './likeController.js'

import { userRepository } from '../repositories/userRepository.js'


export async function signUp(req, res, next) {
	const user = req.body

	try {
		const emailRegistered = await userRepository.searchEmail(user.email)
		if (emailRegistered !== 0)
			return res.status(409).send('Email is already taken')

		const usernameRegistered = await userRepository.searchUsername(user.username)
		if (usernameRegistered !== 0)
			return res.status(409).send('Username is already taken')

		const password = bcrypt.hashSync(user.password, 10)

		const newUser = {
			...user,
			password
		}

		await userRepository.signUp(newUser)

		res.sendStatus(201)
	} catch (error) {
		next(error)
	}
}

export async function getUserPosts(req, res, next) {
	const { locals: { userId } } = res
	const { id } = req.params
	const OFFSET = req.query.offset

	try {
		const user = await userRepository.findUser(id)

		if (!user) return res.sendStatus(404)

		const userPosts = await userRepository.getUserPosts({
			searcherId: userId,
			userId: id,
			offset: OFFSET
		})

		const likesPostsList = await likeController.getLikesPosts({
			postList: userPosts
		})

		return res.status(200).send(likesPostsList)

	} catch (error) {
		next(error)
	}
}


export async function getUsers(req, res, next) {
	const { query: { userName } } = req
	const { locals: { userId } } = res

	try {
		const users = await userRepository.findUsers({
			name: userName,
			searcherId: userId
		})

		return res.status(200).send(users)

	} catch (error) {
		next(error)
	}
}
