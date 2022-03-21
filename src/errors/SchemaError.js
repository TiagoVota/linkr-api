class SchemaError extends Error {
	constructor(message) {
		super(message)
		this.name = 'SchemaError'
		this.message = message
		this.status = 422
	}
}


export default SchemaError
