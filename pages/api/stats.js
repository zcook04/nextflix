import jwt from 'jsonwebtoken'
import { findVideoByIssuer, addStatsOne, updateStatsOne, getWatchedVideos } from '../../lib/hasura'

const stats = async (req, res) => {
    try {
        if (!req.cookies.token)
            return res.status(403).json({ err: "Cookie required but not found" })
        const { issuer } = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        const { videoId } = req.method === "POST" ? req.body : req.query
        const statsExist = await findVideoByIssuer(issuer, videoId, req.cookies.token)


        if (req.method === "POST") {
            const { watched, favorited } = req.body

            if (typeof watched !== 'boolean') {
                console.error('watched required')
                return res.status(422).json({ done: false, err: 'Watched is required' })
            }
            if (typeof favorited !== 'number') {
                console.error('favorite required')
                return res.status(422).json({ done: false, err: 'Incorrect Value for favorited' })
            }

            if (statsExist.length > 0) {
                const updatedVideoStats = await updateStatsOne(req.cookies.token, { userId: issuer, videoId, watched, favorited })
                return res.status(200).json({ done: true, updatedVideoStats })
            } else {
                const newVideoStats = await addStatsOne(req.cookies.token, issuer, videoId)
                return res.status(201).json({ done: true, newVideoStats })
            }
        } else {
            if (statsExist.length > 0) {
                return res.status(200).json({ done: true, stats: statsExist })
            } else {
                return res.status(200).json({ done: false, stats: {} })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ done: false, error })
    }
}

export default stats