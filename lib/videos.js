import data from '../data/google_api_sample.json'

export const getVideos = () => {
    const parsed_data = data.items.map(item => {
        return {
            imgUrl: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
            id: item?.id?.videoId,
            description: item.snippet.description
        }
    })
    console.log(parsed_data)
    return parsed_data
}