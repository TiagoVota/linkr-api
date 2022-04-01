import connection from '../database/database.js'


const findUserFollows = async ({ id }) => {
	const queryStr = `
		SELECT
			*
		FROM
			followers
		WHERE
			"userId" = $1;
	`
	const queryArgs = [id]

	const followerResult = await connection.query(queryStr, queryArgs)
	if (followerResult.rowCount === 0) return null

	return followerResult.rows
}


const findUserFollowByFollowerId = async ({ followId, followerId }) => {
	const queryStr = `
		SELECT
			*
		FROM
			followers
		WHERE
			"userId" = $1
			AND "followingId" = $2;
	`
	const queryArgs = [followerId, followId]

	const followerResult = await connection.query(queryStr, queryArgs)
	if (followerResult.rowCount === 0) return null

	return followerResult.rows[0]
}


const insertFollow = async ({ followId, followerId }) => {
	const queryStr = `
		INSERT INTO
			followers ("userId", "followingId")
		VALUES
			($1, $2) RETURNING *;
	`
	const queryArgs = [followerId, followId]

	const followResult = await connection.query(queryStr, queryArgs)

	return followResult.rows[0]
}


const deleteFollow = async ({ followId, followerId }) => {
	const queryStr = `
		DELETE FROM
			followers
		WHERE
			"userId" = $1
			AND "followingId" = $2 RETURNING *;
	`
	const queryArgs = [followerId, followId]

	const unfollowResult = await connection.query(queryStr, queryArgs)

	return unfollowResult.rows[0]
}



export {
	findUserFollows,
	findUserFollowByFollowerId,
	insertFollow,
	deleteFollow,
}
