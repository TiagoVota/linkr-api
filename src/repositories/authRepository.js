import connection from '../database/database.js'

async function login(email) {
	const queryStr = `
    SELECT * FROM users
    WHERE email=$1
  `
	const queryArgs = [email]

	const result = await connection.query(queryStr, queryArgs)
	return result
}

async function createSession(id, token) {
	const queryStr = `
    INSERT INTO sessions
      ("userId", token)
    VALUES ($1, $2)
  `
	const queryArgs = [id, token]

	const result = await connection.query(queryStr, queryArgs)
	return result
}

const findSessionByToken = async ({ token }) => {
	const queryStr = `
		SELECT * FROM sessions
		WHERE token = $1;
	`
	const queryArgs = [token]

	const sessionResult = await connection.query(queryStr, queryArgs)

	if (sessionResult.rowCount === 0) return null
	return sessionResult.rows[0]
}

export const authRepository = {
	login,
	createSession
}
