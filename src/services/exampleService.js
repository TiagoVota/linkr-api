import * as exampleRepository from '../repositories/exampleRepository.js'
import * as exampleSchema from '../schemas/exampleSchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import SchemaError from '../errors/SchemaError.js'


const serviceFunction = async (exampleInfo) => {
	const exampleErrors = validationErrors({
		objectToValid: exampleInfo,
		objectValidation: exampleSchema.exampleSchema
	})

	if (exampleErrors) throw new SchemaError(exampleErrors)

	const result = await exampleRepository.repositoryFunction(exampleInfo)

	return result
}



export {
	serviceFunction,
}
