import connection from '../database/database.js'


async function createPost(link, message) {
	const queryStr = `
	  INSERT INTO posts
		("userId", token)
	  VALUES ($1, $2)
	`
	const queryArgs = [link, message]
  
	const result = await connection.query(queryStr, queryArgs)
	return result
  }

  export const postRepository = {
	createPost,
  }
