import joi from 'joi'


const exampleSchema = joi.object({
	email: joi.string().email().required(),
	name: joi.string().min(2).max(255).required(),
	age: joi.number().integer().min(1).max(200).required()
}).length(3)


export {
	exampleSchema,
}
