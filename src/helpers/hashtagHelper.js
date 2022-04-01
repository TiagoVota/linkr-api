const hashtagRegex = /#[a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÓÔÕÚÇÑ0-9]+/gi

const makeHashtagList = (message) => {
	if (message === '') return []

	const hashtagList = message
		?.match(hashtagRegex)
		.forEach(name => name.toLowerCase())

	return hashtagList
}


export {
	makeHashtagList,
}
