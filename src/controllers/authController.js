import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { authRepository } from '../repositories/authRepository.js'
import AuthError from '../errors/AuthError.js'


const authUser = async ({ token }) => {
	if (!token) throw new AuthError(`'${token}' has invalid token syntax!`)

	const session = await authRepository.findSessionByToken({ token })

	if (session === null) throw new AuthError()
	const { userId } = session

	return userId
}

export async function login(req, res, next) {
	const userInfo = req.body

	try {
		const user = await authRepository.login(userInfo.email)

		if (user.rowCount === 0)
			return res.status(401).send('Email or password incorrect')

		if (!bcrypt.compareSync(userInfo.password, user.rows[0].password))
			return res.status(401).send('Email or password incorrect')

		const token = uuid()
		await authRepository.createSession(user.rows[0].id, token)

		const authDetails = (user.rows[0])
		delete authDetails.password
		delete authDetails.email

		res.status(200).send({ authDetails, token })
	} catch (error) {
		next(error)
	}
}

export {
	authUser,
}
