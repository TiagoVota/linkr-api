import connection from '../database/database.js'


async function createPost(url, title, description, image, userId, message) {
	const queryStr = `
		with link as (
			INSERT INTO links
				(url, title, description, image)
			VALUES  
				($1, $2, $3, $4)
	  		RETURNING id
		)
		INSERT INTO posts 
			("userId", "linkId", message)
		VALUES
			($5, (SELECT id FROM link), $6)
	`
	const queryArgs = [url, title, description, image, userId, message]

	const result = await connection.query(queryStr, queryArgs)
	return result
  }

  export const postRepository = {
	createPost,
  }
