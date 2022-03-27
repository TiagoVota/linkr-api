import joi from 'joi'

const updatePostSchema = joi.object({
	message: joi.string().allow(null, '')
})

export default updatePostSchema