import connection from '../database/database.js'


const repositoryFunction = async ({ email, name, age }) => {
	const queryStr = `
	
	`
	const queryArgs = []


	const result = await connection.query(queryStr, queryArgs)

	return result
}


const findPosts = async ({ limit }) => {
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
			posts AS p
			JOIN users AS u ON p."userId" = u.id
			JOIN links AS l ON p."linkId" = l.id
		ORDER BY
			p."createDate" DESC
		LIMIT
			${limit};
	`

	const postsResult = await connection.query(queryStr)

	return postsResult.rows
}


export {
	findPosts,
}
