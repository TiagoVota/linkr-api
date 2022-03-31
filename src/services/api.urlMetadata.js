import urlMetadata from 'url-metadata'

import { choseLinkImg } from '../helpers/urlMetadataHelper.js'


const getUrl = async (url) => {
	let urlInfo = {}

	try {
		const response = await urlMetadata(url)

		urlInfo = {
			url: response.url || '',
			title: response.title || '',
			description: response.description || '',
			image: choseLinkImg(response),
		}

	} catch (error) {
		urlInfo = null
		console.log('url-metadata error:\n', error)
	}

	return urlInfo
}

export {
	getUrl,
}
