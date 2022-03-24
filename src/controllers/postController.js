import { postRepository } from '../repositories/postRepository.js'
import { getUrl } from '../services/api.urlMetadata.js'

export async function createPost(req, res, next) {
  const postInfo = req.body
  const userId = res.locals.userId
  const info = await getUrl(postInfo.link)

  try {
    await postRepository.createPost(info.url, info.title, info.description, info.image, userId, postInfo.message)  

    res.status(200).send({})
  } catch (error) {
    next(error)
  }
}
