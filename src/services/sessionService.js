import * as sessionRepository from '../repositories/sessionRepository.js'

import AuthError from '../errors/AuthError.js'


const authUser = async ({ token }) => {
	if (!token) throw new AuthError(`'${token}' has invalid token syntax!`)

	const session = await sessionRepository.findSessionByToken({ token })

	if (!session) throw new AuthError()
	const { userId } = session

	return userId
}



export {
	authUser,
}
