import joi from 'joi'


const linkImgSchema = joi.object({
	image: joi.string().uri().required(),
}).length(1)


export default linkImgSchema
