import * as sessionController from '../controllers/sessionController.js'


const authMiddleware = async (req, res, next) => {
	const { headers: { authorization } } = req
	const token = authorization?.replace('Bearer ', '')

	try {
		const userId = await sessionController.authUser({ token })
	
		res.locals.userId = userId
		
		next()
		
	} catch (error) {
		next(error)
	}
}


export default authMiddleware
