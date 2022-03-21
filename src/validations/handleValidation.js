const validationErrors = ({ objectToValid, objectValidation }) => {
	const objectError = objectValidation.validate(objectToValid).error

	if (objectError) return objectError.details[0].message
	return null
}


export {
	validationErrors
}
