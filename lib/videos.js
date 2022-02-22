export const getVideos = async (category) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${category}&key=${process.env.NEXTFLIX_GOOGLE_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    const parsed_data = data.items.map(item => {
        return {
            imgUrl: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
            id: item?.id?.videoId || '',
            description: item.snippet.description
        }
    })
    return parsed_data
}