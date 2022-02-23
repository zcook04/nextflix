import sampleData from '../data/google_api_sample.json'

export const getCommonVideos = async (query) => {
    try {
        // const data = sampleData
        const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/'
        // WORKING CODE BELOW.  COMMENTED OUT TO SAVE DEV API CALLS.
        const url = `${BASE_URL}${query}&key=${process.env.NEXTFLIX_GOOGLE_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()
        if (data?.error) {
            console.error('Youtube API Error', data.error)
            return []
        }

        const parsed_data = data.items.map(item => {
            return {
                imgUrl: item.snippet.thumbnails.high.url,
                title: item.snippet.title,
                id: item?.id?.videoId || '',
                description: item.snippet.description,
                date: item.snippet.publishedAt ? item.snippet.publishedAt : 0,
                tags: item.snippet.tags ? item.snippet.tags : '',
                views: item.statistics ? item.statistics.viewCount : 0
            }
        })
        return parsed_data
    } catch (err) {
        console.error('Something went wrong', err)
        return []
    }
}

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`
    return getCommonVideos(URL)
}

export const getPopularVideos = () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=25&char=mostPopular&regionCode=US`
    return getCommonVideos(URL)
}

export const getYoutubeVideoById = (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`
    return getCommonVideos(URL)
}