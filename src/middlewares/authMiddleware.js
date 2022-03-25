import * as authController from '../controllers/authController.js'

import { validationErrors } from '../validations/handleValidation.js'

import { tokenSchema } from '../schemas/authSchema.js'

import AuthError from '../errors/AuthError.js'


const authMiddleware = async (req, res, next) => {
	const { headers: { authorization } } = req
	const token = authorization?.replace('Bearer ', '')

	try {
		const errors = validationErrors({
			objectToValid: { token },
			objectValidation: tokenSchema
		})

		if (!token || errors) {
			throw new AuthError(`'${token}' has invalid token syntax!`)
		}
	
		const userId = await authController.authUser({ token })

		res.locals.userId = userId

		next()

	} catch (error) {
		console.log(error)
		next(error)
	}
}


export default authMiddleware
