import pg from 'pg'

const { Pool } = pg


const {
	NODE_ENV,
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_NAME,
	DB_PASS,
} = process.env

const prodConfig = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	}
}

const devConfig = {
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	database: DB_NAME,
	password: DB_PASS
}

const databaseConfig = (NODE_ENV === 'production') ? prodConfig : devConfig

const connection = new Pool(databaseConfig)


export default connection
