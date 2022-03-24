import urlMetadata from 'url-metadata'

const getUrl = async (url) => {
	let urlInfo = {}

	const response = await urlMetadata(url)
	try {
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

	// console.log(urlInfo)
	return urlInfo
}

export {
	getUrl,
}
