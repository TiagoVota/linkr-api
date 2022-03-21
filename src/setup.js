import dotenv from 'dotenv'


const { NODE_ENV } = process.env

const paths = {
	'production': '.env',
	'test': '.env.test'
}

const path = paths[NODE_ENV] || '.env.dev'


dotenv.config({
	path
})
