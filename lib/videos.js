import sampleData from '../data/google_api_sample.json'
import { getWatchedVideos, fetchMyListVideos } from './hasura'

export const fetchVideos = async (query) => {
    const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/'
    const url = `${BASE_URL}${query}&key=${process.env.NEXTFLIX_GOOGLE_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    if (data?.error) {
        console.error('Youtube API Error', data.error)
        return []
    }
    return data
}

export const getCommonVideos = async (query) => {
    const isDev = process.env.DEVELOPMENT;
    try {
        const data = isDev ? sampleData : await fetchVideos(query)
        const parsed_data = data.items.map(item => {
            return {
                imgUrl: `https://i.ytimg.com/vi/${item.id.videoId}/maxresdefault.jpg`,
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

export const getWatchItAgainVideos = async (issuer, token) => {
    const videos = await getWatchedVideos(issuer, token)
    return videos?.map(video => {
        return {
            id: video.videoId,
            imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
        }
    })
}

export const getMyListVideos = async (issuer, token) => {
    const videos = await fetchMyListVideos(issuer, token)
    return videos?.map(video => {
        return {
            id: video.videoId,
            imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
        }
    })
}