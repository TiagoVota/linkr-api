import joi from 'joi'

const postSchema = joi.object({
	url: joi.string().pattern(new RegExp('^(http://)|(https://)')).required(),
	message: joi.string().allow('')
})

export default postSchema