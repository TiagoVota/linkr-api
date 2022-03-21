class AuthError extends Error {
	constructor(message) {
		super(message)
		this.name = 'AuthError'
		this.message = message || 'Token is not valid!'
		this.status = 401
	}
}


export default AuthError
