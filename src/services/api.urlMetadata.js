import urlMetadata from 'url-metadata'

const getUrl = async (url) => {
	let urlInfo = {}

	try {
		const response = await urlMetadata(url)
		const image = response['twitter:image'] || response.image || response['og:image']
			urlInfo = {
				url: response.url,
				title: response.title,
				description: response.description,
				image,
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
