class ExistentLikeError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ExistentLikeError'
		this.message = 'Post already liked!'
		this.status = 409
	}
}


export default ExistentLikeError
