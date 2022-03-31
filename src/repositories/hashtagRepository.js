import connection from '../database/database.js'

async function insertHashtag(filteredHashtags, hashtagsFoundId, postId, isUpdate) {
	let result = []
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

async function deleteHashtagsPosts(hashtags, postId) {
	let resultHashtag = []

	if (hashtags.length !== 0) {
		try {
			const hashtagsFound = await searchHashtag(hashtags)
			let hashtagsFoundId = []
			let valuesString = ''
			
			hashtagsFound.forEach((hashtag, index) => {
				hashtagsFoundId.push(hashtagsFound[index].rows[0].id)
				valuesString += `$${index+2}, `
			})
			
			const queryStr = `
			DELETE FROM "hashtagsPosts"
			WHERE "postId" = $1
			AND "hashtagId" NOT IN (${valuesString.slice(0,-2)});
			`
			const queryArgs = [postId, ...hashtagsFoundId]
			resultHashtag = await connection.query(queryStr, queryArgs)
		} catch (error) {
			console.log(error)
		}

	} else {
		try {
			const queryStr = `
			DELETE FROM "hashtagsPosts"
			WHERE "postId" = $1;
		`
			const queryArgs = [postId]
			resultHashtag = await connection.query(queryStr, queryArgs)
		} catch (error) {
			console.log(error)
		}
	}

	return resultHashtag
}

async function searchHashtag(hashtags) {
	const queryStr = `
		SELECT id, name FROM hashtags
		WHERE name=$1;
	`
	let resultHashtag = []
	for (let i = 0; i < hashtags.length; i++) {
		let queryArgs = [hashtags[i]]
		resultHashtag.push(await connection.query(queryStr, queryArgs))
	}
	
	return resultHashtag
}

async function searchHashtagsPosts(postId) {
	const queryStr = `
		SELECT "hashtagId" FROM "hashtagsPosts"
		WHERE "postId"=$1;
	`
	const queryArgs = [postId]

	const resultHashtagsPosts = await connection.query(queryStr, queryArgs)
	
	return resultHashtagsPosts
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

async function getHashtag({ name, limit }){
	const queryStr = `
		SELECT
			p.id AS "postId",
			p."userId",
			p.message,
			u.username,
			u.picture,
			l.url AS link,
			l.title,
			l.description,
			l.image
		FROM
			hashtags AS h
			JOIN "hashtagsPosts" AS hp ON h.id = hp."hashtagId"
			JOIN posts AS p ON p.id = hp."postId"
			JOIN users AS u ON p."userId" = u.id
			JOIN links AS l ON p."linkId" = l.id
		WHERE
			h.name ILIKE $1
		ORDER BY
			p."createDate" DESC
		LIMIT
			${limit};
	`
	const queryArgs = [name]
	
	const hashtagPostsResult = await connection.query(queryStr, queryArgs)

	return hashtagPostsResult.rows
}


export const hashtagRepository = {
	insertHashtag,
	searchHashtag,
	getHashtags,
	deleteHashtagsPosts,
	searchHashtagsPosts,
	getHashtag,
}
