import joi from 'joi'

const postSchema = joi.object({
	link: joi.string().pattern(new RegExp('^(http://)|(https://)')).required(),
	message: joi.string().allow(''),
	hashtags: joi.array().items(joi.string())
})

export default postSchema