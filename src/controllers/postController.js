import { hashtagRepository } from '../repositories/hashtagRepository.js'
import { postRepository } from '../repositories/postRepository.js'
import { getUrl } from '../services/api.urlMetadata.js'

async function createPost(req, res, next) {
  const postInfo = req.body
  const userId = res.locals.userId
  const info = await getUrl(postInfo.link)

  let hashtags = []
  if (postInfo.message !== '') {
    hashtags = postInfo.message.match(/#[a-z]+/gi)
  }

  try {
    const postId = await postRepository.createPost(info.url, info.title, info.description, info.image, userId, postInfo.message)  

    if (hashtags !== null) {
        let hashtagExist = false
        let hashtagsFound = []
        const resultHashtag = await hashtagRepository.searchHashtag(hashtags)

        hashtagsFound = resultHashtag.filter(hashtag => hashtag.rowCount !== 0)

        console.log(hashtagsFound)
  
        // if (resultHashtag.rowCount !== 0) hashtagExist = true
  
        // await hashtagRepository.insertHashtag(hashtags, postId.rows[0].id, hashtagExist, resultHashtag)
  
    }

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
    res.sendStatus(200)

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


export {
	createPost, getTimelinePosts,
}
