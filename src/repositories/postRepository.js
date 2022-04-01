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

const findTimelinePosts = async ({ searcherId, limit }) => {
	const queryStr = `
		SELECT
			p.id AS "postId",
			p."userId",
			p.message,
			p."createDate",
			u.username,
			u.picture,
			l.url AS link,
			l.title,
			l.description,
			l.image,
			"isFollowing"(f."userId")
		FROM
			posts AS p
			JOIN users AS u ON p."userId" = u.id
			JOIN links AS l ON p."linkId" = l.id
			LEFT JOIN followers AS f ON (
				f."followingId" = u.id
				AND f."userId" = $1
			)
		WHERE
			u.id = $1
			OR "isFollowing"(f."userId") IS TRUE
		ORDER BY
			p."createDate" DESC
		LIMIT
			${limit};
	`
	const queryArgs = [searcherId]

	const postsResult = await connection.query(queryStr, queryArgs)

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

async function insertRepost(userId, postId) {
	const queryStr = `
		INSERT INTO 
			"rePosts" ("sharedId", "postId")
		VALUES ($1, $2)
	`
	const queryArgs = [userId, postId]

	return connection.query(queryStr, queryArgs)
}

async function selectRepost(userId, postId) {
	const queryStr = `
		SELECT * FROM "rePosts"
		WHERE "sharedId"=$1 AND "postId"=$2
	`
	const queryArgs = [userId, postId]

	return connection.query(queryStr, queryArgs)
}

async function countReposts(postId) {
	const queryStr = `
		SELECT COUNT("postId")
		FROM 
			"rePosts"
		WHERE
			"rePosts"."postId"=$1
	`
	const queryArgs = [postId]

	return connection.query(queryStr, queryArgs)
}

async function removeRepost(userId, postId) {
	const queryStr = `
		DELETE FROM "rePosts"
		WHERE "sharedId"=$1 AND "postId"=$2
	`
	const queryArgs = [userId, postId]

	return connection.query(queryStr, queryArgs)
}

async function selectReposts({ searcherId }) {
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
		l.image, 
		r.id AS "rePostId",
		r."sharedId" AS "userSharedId",
		ur.username AS "userSharedName",
		r."postId",
		r."createDate",
		"isFollowing"(f."userId")
	FROM posts AS p
		JOIN links AS l ON p."linkId"=l.id
		JOIN users AS u ON p."userId"=u.id
		JOIN "rePosts" AS r ON r."postId"=p.id
		JOIN users AS ur on r."sharedId"=ur.id
		LEFT JOIN followers AS f ON (
			f."followingId" = r."sharedId"
			OR f."userId" = $1
		)
	WHERE
		"isFollowing"(f."userId") IS TRUE
		ORDER BY
			r."createDate" DESC
	`

	const queryArgs = [searcherId]

	return connection.query(queryStr, queryArgs)
}

async function selectRepostsByUser(userId) {
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
		l.image, 
		r.id AS "rePostId",
		r."sharedId" AS "userSharedId",
		ur.username AS "userSharedName",
		r."postId",
		r."createDate"
	FROM posts AS p
		JOIN links AS l ON p."linkId"=l.id
		JOIN users AS u ON p."userId"=u.id
		JOIN "rePosts" AS r ON r."postId"=p.id
		JOIN users AS ur on r."sharedId"=ur.id
	WHERE
		r."sharedId"=$1
		ORDER BY
			r."createDate" DESC
	`
	const queryArgs = [userId]

	return connection.query(queryStr, queryArgs)
}

async function selectRepostsByHashtag({ name }) {
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
		l.image, 
		r.id AS "rePostId",
		r."sharedId" AS "userSharedId",
		ur.username AS "userSharedName",
		r."postId",
		r."createDate"
	FROM posts AS p
		JOIN links AS l ON p."linkId"=l.id
		JOIN users AS u ON p."userId"=u.id
		JOIN "rePosts" AS r ON r."postId"=p.id
		JOIN users AS ur ON r."sharedId"=ur.id
		JOIN "hashtagsPosts" AS hp ON hp."postId"=p.id
		JOIN hashtags AS h ON hp."hashtagId"=h.id
	WHERE
		h.name=$1
	ORDER BY
			r."createDate" DESC
	`
	const queryArgs = [name]

	return connection.query(queryStr, queryArgs)
}

export const postRepository = {
	createPost, 
	findTimelinePosts, 
	selectPost, 
	deletePost,
	findOnePost,
	updatePost,
	insertRepost,
	selectRepost,
	removeRepost,
	countReposts,
	selectReposts,
	selectRepostsByUser,
	selectRepostsByHashtag
}
