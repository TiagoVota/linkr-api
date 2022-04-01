import connection from '../database/database.js'

async function signUp({ email, username, password, picture }) {
	const queryStr = `
		INSERT INTO users
			(email, username, password, picture)
		VALUES
			($1, $2, $3, $4);
	`
	const queryArgs = [email, username, password, picture]

	const result = await connection.query(queryStr, queryArgs)
	return result
}

async function searchEmail(email) {
	const queryStr = `
		SELECT id FROM users
		WHERE email=$1;
	`
	const queryArgs = [email]

	const result = await connection.query(queryStr, queryArgs)
	return result.rowCount
}

async function searchUsername(username) {
	const queryStr = `
		SELECT id FROM users
		WHERE username=$1;
	`
	const queryArgs = [username]

	const result = await connection.query(queryStr, queryArgs)
	return result.rowCount
}

async function findUser(id) {
	const queryStr = `
		SELECT id
		FROM users
		WHERE id=$1
	`
	const queryArgs = [id]

	const result = await connection.query(queryStr, queryArgs)
	return result.rowCount
}

async function getUserPosts({ searcherId, userId, offset }) {
	const queryStr = `
		SELECT
			u.username,
			u.picture,
			p.id AS "postId",
			p."userId",
			p.message,
			l.url AS link,
			l.title,
			l.description,
			l.image,
			"isFollowing"(f."userId")
		FROM
			users AS u
			LEFT JOIN posts AS p ON p."userId" = u.id
			LEFT JOIN links AS l ON p."linkId" = l.id
			LEFT JOIN followers AS f ON (
				f."followingId" = u.id
				AND f."userId" = $1
			)
		WHERE
			u.id = $2
		ORDER BY
			p."createDate" DESC
		LIMIT 
				10
		OFFSET
			${offset};
	`

	const queryArgs = [searcherId, userId]

	const postsResult = await connection.query(queryStr, queryArgs)

	return postsResult.rows
}


async function findUsers({ searcherId, name }) {
	const queryStr = `
			SELECT
			u.id,
			u.username,
			u.picture,
			"isFollowing"(f."userId")
		FROM
			users AS u
			LEFT JOIN followers AS f ON (
				f."followingId" = u.id
				AND f."userId" = $1
			)
		WHERE
			u.username ILIKE $2
		ORDER BY
			f."userId",
			u.username;
	`
	const queryArgs = [searcherId, `${name}%`]

	const usersResult = await connection.query(queryStr, queryArgs)

	return usersResult.rows
}


export const userRepository = {
	signUp,
	searchEmail,
	searchUsername,
	getUserPosts,
	findUser,
	findUsers,
}
