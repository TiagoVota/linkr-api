const hashtagRegex = /#[a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÓÔÕÚÇÑ0-9]+/gi

const makeHashtagList = (message) => {
	if (message === '') return []

	const regexResult = message?.match(hashtagRegex) || []

	const hashtagList = regexResult.map(name => name.toLowerCase())

	return hashtagList
}


export {
	makeHashtagList,
}
