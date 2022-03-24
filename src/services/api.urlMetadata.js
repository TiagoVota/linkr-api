import urlMetadata from 'url-metadata'

const getUrl = async (url) => {
	let urlInfo = {}
	
	await urlMetadata(url)
		.then((data) => {
			const image = data['twitter:image'] || data.image || data['og:image']

			urlInfo = {
				url: data.url,
				title: data.title,
				description: data.description,
				image,
			}
		})
		.catch(error => {
			urlInfo = null
			console.log('url-metadata error:\n', error)
		})

	return urlInfo
}


export {
	getUrl,
}
