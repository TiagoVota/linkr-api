const errorsName = [
	'AuthError',
	'ExistentLikeError',
	'ExistentFollowError',
	'ExampleError',
	'NoFollowerError',
	'NoLikeError',
	'SchemaError',
]

const isPersonalizedError = errorName => errorsName.includes(errorName)


export {
	isPersonalizedError,
}
