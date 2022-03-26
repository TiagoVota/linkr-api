import connection from '../database/database.js'

async function insertHashtag(hashtags, postId) {
  const queryStr = `
		with hashtag as (
			INSERT INTO hashtags
				(name)
			VALUES  
				($1)
			RETURNING id
		)
		INSERT INTO "hashtagsPosts"
			("postId", "hashtagId")
		VALUES
			($2, (SELECT id FROM hashtag))
		;
	`
  let result = [];
  for (let i = 0; i < hashtags.length; i++) {
    let queryArgs = [hashtags[i], postId]
    result.push(await connection.query(queryStr, queryArgs))
  }
  return result
}

async function getHashtags() {
  const queryStr = `
    SELECT hashtags.id, hashtags.name
    FROM "hashtagsPosts" h
    JOIN hashtags ON h."hashtagId"=hashtags.id
    GROUP BY hashtags.name, h."hashtagId", hashtags.id
    ORDER BY COUNT(h."hashtagId") DESC
    LIMIT 10
  `
  const result = await connection.query(queryStr)
  return result.rows
}


export const hashtagRepository = {
  insertHashtag,
  getHashtags
}