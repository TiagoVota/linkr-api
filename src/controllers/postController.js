import { authRepository } from '../repositories/authRepository.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { postRepository } from '../repositories/postRepository.js'
import { getUrl } from '../services/api.urlMetadata.js'

export async function createPost(req, res, next) {
  const postInfo = req.body

  getUrl(postInfo.url)

  // getUrl(postInfo.url)


  // try {
  //   const post = await  postRepository.createPost()  

  //   if (post.rowCount === 0)
  //     return res.status(401).send("Email e/ou senha incorretos")

  //   if (!bcrypt.compareSync(postInfo.password, post.rows[0].password))
  //     return res.status(401).send("Email e/ou senha incorretos")

  //   const token = uuid()
  //   await authRepository.createSession(post.rows[0].id, token)

	// 			const authDetails = (post.rows[0])
	// 			delete authDetails.password
	// 			delete authDetails.email

  //   res.status(200).send({authDetails, token})
  // } catch (error) {
  //   next(error)
  // }
}
