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


const findUserLikeByPostId = async ({ userId, postId }) => {
	const queryStr = `
		SELECT
			*
		FROM
			likes
		WHERE
			"userId" = $1
			AND "postId" = $2;
	`
	const queryArgs = [userId, postId]

	const likesResult = await connection.query(queryStr, queryArgs)
	if (likesResult.rowCount === 0) return null

	return likesResult.rows[0]
}


const insertLike = async ({ userId, postId }) => {
	const queryStr = `
		INSERT INTO
			likes ("userId", "postId")
		VALUES
			($1, $2) RETURNING *;
	`
	const queryArgs = [userId, postId]

	const likesResult = await connection.query(queryStr, queryArgs)

	return likesResult.rows[0]
}


const deleteLike = async ({ userId, postId }) => {
	const queryStr = `
		DELETE FROM
			likes
		WHERE
			"userId" = $1
			AND "postId" = $2 RETURNING *;
	`
	const queryArgs = [userId, postId]

	const likesResult = await connection.query(queryStr, queryArgs)

	return likesResult.rows[0]
}



export {
	findLikesByPostId,
	findUserLikeByPostId,
	insertLike,
	deleteLike,
}
