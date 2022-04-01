class ExistentFollowError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ExistentFollowError'
		this.message = 'User already follow!'
		this.status = 409
	}
}


export default ExistentFollowError
