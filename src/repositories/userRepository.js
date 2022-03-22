import connection from '../database/database.js'


const repositoryFunction = async ({ email, name, age }) => {
	const queryStr = `
	
	`
	const queryArgs = []


	const result = await connection.query(queryStr, queryArgs)

	return result
}


export {
	repositoryFunction,
}
