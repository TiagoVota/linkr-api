import connection from '../database/database.js'


const findSessionByToken = async ({ token }) => {
	const { mongoClient, db } = await connection()

	const session = await db.collection('sessions').findOne({ token })
	mongoClient.close()
	
	if (!session) return null
	return session
}


export {
	findSessionByToken,
}
