class NoLikeError extends Error {
	constructor(message) {
		super(message)
		this.name = 'NoLikeError'
		this.message = 'No exists like from this user for this post!'
		this.status = 404
	}
}


export default NoLikeError
