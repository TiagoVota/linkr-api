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

async function getComments(postId, userId) {
	const queryStr = `
		SELECT 
      c.id, 
      c.text, 
	    c."authorId",
      u.picture, 
      u.username, 
	    "isFollowing"(f."followingId")
    FROM comments c
    LEFT JOIN users u ON c."authorId"=u.id
    LEFT JOIN followers f ON f."followingId"=c."authorId" AND f."userId"=$2
    WHERE c."postId"=$1
    ORDER BY c.id
 `
	const queryArgs = [postId, userId]

	const result = await connection.query(queryStr, queryArgs)
	return result.rows
}

export const commentRepository = {
	createComment,
	getComments
}
