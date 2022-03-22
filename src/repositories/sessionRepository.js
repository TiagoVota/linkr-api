import connection from '../database/database.js'


const findSessionByToken = async ({ token }) => {
	const queryStr = `
		SELECT
			*
		FROM
			sessions
		WHERE
			token = $1;
	`
	const queryArgs = [token]

	const sessionResult = await connection.query(queryStr, queryArgs)
	
	if (sessionResult.rowCount === 0) return null
	return sessionResult.rows[0]
}


export {
	findSessionByToken,
}
