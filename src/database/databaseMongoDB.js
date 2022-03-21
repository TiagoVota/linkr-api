import { MongoClient } from 'mongodb'


const {
	MONGO_URI,
	MONGO_NAME,
} = process.env

const connection = async () => {
	const mongoClient = new MongoClient(MONGO_URI)
	await mongoClient.connect()
	
	const db = mongoClient.db(MONGO_NAME)

	return { mongoClient, db }
}


export default connection
