import connection from '../database/database.js'

async function signUp({ email, username, password, picture }) {
	const queryStr = `
	  INSERT INTO users
      (email, username, password, picture)
    VALUES
      ($1, $2, $3, $4)
	`
	const queryArgs = [email, username, password, picture]

	const result = await connection.query(queryStr, queryArgs)
	return result
}

async function searchEmail(email) {
	const queryStr = `
    SELECT id FROM users
    WHERE email=$1
  `
	const querysArgs = [email]

	const result = await connection.query(queryStr, querysArgs)
	return result
}

async function searchUsername(username) {
	const queryStr = `
    SELECT id FROM users
    WHERE username=$1
  `
	const querysArgs = [username]

	const result = await connection.query(queryStr, querysArgs)
	return result
}

export const userRepository = {
	signUp,
	searchEmail,
	searchUsername
}