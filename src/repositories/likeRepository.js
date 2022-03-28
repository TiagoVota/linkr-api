import connection from '../database/database.js'


const findLikesByPostId = async ({ id }) => {
	const queryStr = `
		SELECT
			l."userId",
			u.username
		FROM
			likes AS l
			JOIN users AS u ON u.id = l."userId"
		WHERE
			l."postId" = $1;
	`
	const queryArgs = [id]

	const likesResult = await connection.query(queryStr, queryArgs)

	return likesResult.rows
}


export {
	findLikesByPostId,
}
