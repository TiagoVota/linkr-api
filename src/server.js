import './setup.js'
import app from './app.js'

const { PORT } = process.env || 4242

app.listen(PORT, () => console.log(`Magic happens at port ${PORT}!`))