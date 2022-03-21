class ExampleError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ExampleError'
		this.message = message
		this.status = 400
	}
}


export default ExampleError

