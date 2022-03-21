import * as exampleService from '../services/exampleService.js'


const controllerFunction = async (req, res, next) => {
	const { body: exampleInfo } = req

	try {
		const result = await exampleService.serviceFunction(exampleInfo)
		
		return res.status(201).send(result)

	} catch (error) {		
		next(error)
	}
}


export {
	controllerFunction,
}
