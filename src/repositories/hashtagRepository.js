import connection from '../database/database.js'

async function insertHashtag(filteredHashtags, hashtagsFoundId, postId) {
	let result = [];
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
				($2, (SELECT id FROM hashtag));
		`

		for (let i = 0; i < filteredHashtags.length; i++) {
			let queryArgs = [filteredHashtags[i], postId]
			result.push(await connection.query(queryStr, queryArgs))
		}

	if (hashtagsFoundId) {
		const queryStr = `
			INSERT INTO "hashtagsPosts"
				("postId", "hashtagId")
			VALUES
				($1, $2);
		`
		for (let i = 0; i < hashtagsFoundId.length; i++) {
			let queryArgs = [postId, hashtagsFoundId[i]]
			result.push(await connection.query(queryStr, queryArgs))
		}
	}

	return result
}

  async function searchHashtag(hashtags) {
	const queryStr = `
		SELECT id, name FROM hashtags
		WHERE name=$1;
	`
	let resultHashtag = [];
	for (let i = 0; i < hashtags.length; i++) {
		let queryArgs = [hashtags[i]]
		resultHashtag.push(await connection.query(queryStr, queryArgs))
	}
	return resultHashtag
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
  searchHashtag,
  getHashtags
}
