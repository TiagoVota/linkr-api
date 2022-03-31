import joi from 'joi'

const commentSchema = joi.object({
	text: joi.string().required(),
	authorId: joi.number().required()
})

export default commentSchema