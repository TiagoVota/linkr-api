const serverMiddlewareError = (err, req, res, next) => {
	console.log(`Middleware de erro:\n  ${err}`)
	
	return res.sendStatus(500)
}


export default serverMiddlewareError
