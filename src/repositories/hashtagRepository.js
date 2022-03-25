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

  export const hashtagRepository = {
	insertHashtag,
  }