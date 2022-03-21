import connection from '../database/database.js'


const repositoryFunction = async ({ email, name, age }) => {
	const data = {
		email,
		name,
		age,
	}
	

	// const result = await connection.databaseFunction(data)
	const result = await data

	return result
}


export {
	repositoryFunction,
}
