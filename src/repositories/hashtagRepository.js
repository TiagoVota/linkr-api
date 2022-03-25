import connection from '../database/database.js'

async function insertHashtag(hashtags, postId, hashtagExist, resultHashtag) {
	let result = [];
	console.log(resultHashtag)

	if (!hashtagExist) {

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

		for (let i = 0; i < hashtags.length; i++) {
			let queryArgs = [hashtags[i], postId]
			result.push(await connection.query(queryStr, queryArgs))
		}
	} else {
		const queryStr = `
			INSERT INTO "hashtagsPosts"
				("postId", "hashtagId")
			VALUES
				($1, $2);
			`
			for (let i = 0; i < resultHashtag.length; i++) {
				let queryArgs = [postId, resultHashtag[i].rows[0].id]
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
	const queryArgs = [hashtags]

	let resultHashtag = [];
	for (let i = 0; i < hashtags.length; i++) {
		let queryArgs = [hashtags[i]]
		resultHashtag.push(await connection.query(queryStr, queryArgs))
	}
	return resultHashtag
}

  export const hashtagRepository = {
	insertHashtag, searchHashtag
  }