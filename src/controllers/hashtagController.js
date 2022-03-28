import { hashtagRepository } from '../repositories/hashtagRepository.js'

async function createInsertHashtag(hashtags, postId, isUpdate) {
  try {
    let filteredHashtags = hashtags
    let hashtagsFoundId = []
    
    const resultHashtag = await hashtagRepository.searchHashtag(hashtags)
    let hashtagsFound = resultHashtag.filter(hashtag => hashtag.rowCount !== 0)



    if (hashtagsFound !== []) {
      let hashtagsFoundName = []

      for(let i = 0; i < hashtagsFound.length; i++) {
        hashtagsFoundName.push(hashtagsFound[i].rows[0].name)
        hashtagsFoundId.push(hashtagsFound[i].rows[0].id)
      }

        filteredHashtags = hashtags.filter(hashtag => !hashtagsFoundName.includes(hashtag))
      }

      const resultHashtagsPostsId = await hashtagRepository.searchHashtagsPosts(postId)
      // console.log(postId)
      // console.log(resultHashtagsPostsId.rows)
      // console.log(resultHashtagsPosts.rows[1])
      let hashtagsPostsId = []
      resultHashtagsPostsId.rows.forEach((id, index) => {
        hashtagsPostsId.push(id.hashtagId)
      })
      // console.log(hashtagsPostsId)


      let filteredhashtagsFoundId = hashtagsFoundId.filter(id => !hashtagsPostsId.includes(id))
      // console.log(hashtagsFoundId)
      // console.log(filteredhashtagsFoundId)

      // console.log(filteredHashtags)
      await hashtagRepository.insertHashtag(filteredHashtags, filteredhashtagsFoundId, postId, isUpdate)

      if (isUpdate) {
        hashtagRepository.deleteHashtagsPosts(hashtags, postId)
      }
  } catch (error) {
    console.log(error)
  }
}

async function getTrendingHashtags(req, res, next) {
  try {
    const hashtags = await hashtagRepository.getHashtags()

    res.send(hashtags)
  } catch (error) {
    next(error)
  }
}

export {
	createInsertHashtag, getTrendingHashtags,
}