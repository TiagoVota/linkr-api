import connection from '../database/database.js'

async function createComment(text, id, postId) {
	const queryStr = `
		INSERT INTO comments
				(text, "authorId", "postId")
		VALUES
				($1, $2, $3)
 `
	const queryArgs = [text, id, postId]

	const result = await connection.query(queryStr, queryArgs)
	return result
}

async function getComments(postId) {
	const queryStr = `
		SELECT 
			c.id, 
			c.text, 
			u.picture, 
			u.username 
		FROM comments c
		JOIN users u ON c."authorId"=u.id
		WHERE c."postId"=$1
		ORDER BY c.id
 `
	const queryArgs = [postId]

	const result = await connection.query(queryStr, queryArgs)
	return result.rows
}

export const commentRepository = {
	createComment,
	getComments
}
