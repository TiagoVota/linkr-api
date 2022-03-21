import { isPersonalizedError } from '../utils/errorsName.js'


const backMiddlewareError = (err, req, res, next) => {
	const { name: errorName, message, status } = err

	if (isPersonalizedError(errorName)) return res.status(status).send(message)
	
	next(err)
}


export default backMiddlewareError
