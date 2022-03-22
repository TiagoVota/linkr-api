
import { validationErrors } from '../validations/handleValidation.js'

import { sanitizeInput } from '../helpers/validationHelper.js'

import SchemaError from '../errors/SchemaError.js'


function schemaValidation(schema) {
	return (req, res, next) => {
		const body = sanitizeInput(req.body)

		const errors = validationErrors({
			objectToValid: body,
			objectValidation: schema
		})

		if (errors) throw new SchemaError(errors)

		next()
	}
}



export {
	schemaValidation,
}
