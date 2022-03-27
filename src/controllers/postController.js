import { hashtagRepository } from '../repositories/hashtagRepository.js'
import { postRepository } from '../repositories/postRepository.js'
import { getUrl } from '../services/api.urlMetadata.js'
import { createInsertHashtag } from './hashtagController.js'

async function createPost(req, res, next) {
  const postInfo = req.body
  const userId = res.locals.userId
  const info = await getUrl(postInfo.link)

  let hashtags = []
  if (postInfo.message !== '') {
    hashtags = postInfo.message?.match(/#[a-z]+/gi)
  }

  try {
    const postId = await postRepository.createPost(info.url, info.title, info.description, info.image, userId, postInfo.message)

    if (hashtags !== null) {
      createInsertHashtag(hashtags, postId)
    }

  } catch (error) {
    next(error)
  }
  res.status(201).send("Created")
}

async function getTimelinePosts(req, res, next) {
  const POSTS_LIMIT = 20

  try {
    const postList = await postRepository.findPosts({ limit: POSTS_LIMIT })

    return res.status(200).send(postList)

  } catch (error) {
    next(error)
  }
}

async function deletePost(req, res) {
	const { id } = req.params

	try {
		const result = await postRepository.selectPost(id, res.locals.userId)
		if(result.rowCount === 0) {
			return res.sendStatus(401)
		}
		await postRepository.deletePost(id)
		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
}

export {
	createPost, 
	getTimelinePosts, 
	deletePost
}
