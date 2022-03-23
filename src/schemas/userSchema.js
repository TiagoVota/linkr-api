import joi from 'joi'

const userSchema = joi.object({
  email: joi.string().email().max(160).required(),
  username: joi.string().min(2).max(80).required(),
  password: joi.string().min(6).max(80).required(),
  picture: joi.string().uri().required()
}).length(4)

export default userSchema
