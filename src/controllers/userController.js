import { userRepository } from '../repositories/userRepository.js'
import bcrypt from 'bcrypt'

export async function signUp(req, res, next) {
	const user = req.body

	try {
		const { rowCount: resultEmail } = await userRepository.searchEmail(user.email)
		if (resultEmail !== 0) return res.status(409).send('Email já cadastrado')

		const { rowCount: resultUsername } = await userRepository.searchUsername(user.username)
		if (resultUsername !== 0) return res.status(409).send('username já está sendo utilizado')

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
