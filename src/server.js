import './setup.js'
import app from './app.js'
import dotenv from 'dotenv'

const { PORT } = process.env || 4242

app.listen(PORT, () => console.log(`Magic happens at port ${PORT}!`))
