const errorsName = [
	'AuthError',
	'ExistentLikeError',
	'ExampleError',
	'NoLikeError',
	'SchemaError',
]

const isPersonalizedError = errorName => errorsName.includes(errorName)


export {
	isPersonalizedError,
}
