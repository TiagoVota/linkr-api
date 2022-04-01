class NoFollowerError extends Error {
	constructor(message) {
		super(message)
		this.name = 'NoFollowerError'
		this.message = 'User already unfollow!'
		this.status = 404
	}
}


export default NoFollowerError
