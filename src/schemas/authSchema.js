import joi from 'joi'

const authSchema = joi.object({
	email: joi.string().email().max(160).required(),
	password: joi.string().min(6).max(80).required(),
}).length(2)

export default authSchema
