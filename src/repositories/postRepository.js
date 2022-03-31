import connection from '../database/database.js'

async function createPost(url, title, description, image, userId, message) {
	const queryStr = `
		with link as (
			INSERT INTO links
				(url, title, description, image)
			VALUES  
				($1, $2, $3, $4)
				RETURNING id
		),
		post as (
			INSERT INTO posts 
				("userId", "linkId", message)
			VALUES
				($5, (SELECT id FROM link), $6)
			RETURNING id
		)
		SELECT id FROM post;
	`
	const queryArgs = [url, title, description, image, userId, message]

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

async function selectPost(id, userId) {
	return connection.query(`
		SELECT *
			FROM posts
			WHERE id=$1
			AND "userId"=$2
	`, [id, userId])
}

async function deletePost(id) {
	return connection.query(`
		DELETE
			FROM posts
			WHERE id=$1
	`, [id])
}

async function findOnePost(id) {
	return connection.query(`
		SELECT * FROM posts
		WHERE id = $1
	`, [id])
}

async function updatePost(id, message) {
	return connection.query(`
		UPDATE posts
			SET message=$1
			WHERE id=$2
	`, [message, id])
}

export const postRepository = {
	createPost, 
	findPosts, 
	selectPost, 
	deletePost,
	findOnePost,
	updatePost
}
