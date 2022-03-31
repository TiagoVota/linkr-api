import { validationErrors } from '../validations/handleValidation.js'

import linkImgSchema from '../schemas/linkImgSchema.js'


const findValidIndex = (image) => {
	const imgError = validationErrors({
		objectToValid: { image },
		objectValidation: linkImgSchema
	})

	return Boolean(!imgError)
}

const isCandidateValid = (candidateImages) => {
	const validIndex = candidateImages.findIndex(findValidIndex)

	return {
		isValid: validIndex !== -1,
		index: validIndex
	}
}

const choseLinkImg = (urlMetadataResponse) => {
	const defaultLinkImage = 'https://revelry.co/wp-content/uploads/2019/05/react-native-UX-design.gif'

	const candidateImages = [
		urlMetadataResponse['twitter:image'],
		urlMetadataResponse.image,
		urlMetadataResponse['og:image']
	]

	const { isValid, index } = isCandidateValid(candidateImages)

	return isValid ? candidateImages[index] : defaultLinkImage
}


export {
	choseLinkImg,
}
