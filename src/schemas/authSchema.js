import joi from 'joi'


const authSchema = joi.object({
	email: joi.string().email().max(160).required(),
	password: joi.string().min(5).max(80).required(),
}).length(2)

const tokenSchema = joi.object({
	token: joi.string().guid({
		version: [
			'uuidv4',
		]
	})
}).length(1)


export {
	authSchema,
	tokenSchema,
}
