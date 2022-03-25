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

async function getUserPosts(id) {
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
      l.image
		FROM
      users AS u
    	LEFT JOIN posts AS p ON p."userId" = u.id
      LEFT JOIN links AS l ON p."linkId" = l.id
    WHERE u.id=$1
    ORDER BY
      p."createDate" DESC
    LIMIT 20
	`

  const queryArgs = [id]

  const postsResult = await connection.query(queryStr, queryArgs)

  return postsResult.rows
}


export const userRepository = {
  signUp,
  searchEmail,
  searchUsername,
  getUserPosts,
  findUser
}
