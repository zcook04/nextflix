import jwt from 'jsonwebtoken'
import { findVideoByIssuer, addStatsOne, updateStatsOne } from '../../lib/hasura'

const stats = async (req, res) => {
    if (req.method !== "POST")
        return res.status(422).json({ err: "Bad method" })

    try {
        if (!req.cookies.token)
            return res.status(403).json({ err: "Cookie required but not found" })

        const { videoId, watched, favorited } = req.body
        const { issuer } = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

        if (watched !== true || watched !== false)
            return res.status(422).json({ done: false, err: 'Watched is required' })
        if (favorited !== 0 || favorited !== 1 || favorited !== 2)
            return res.status(422).json({ done: false, err: 'Incorrect Value for favorited' })

        const statsExist = await findVideoByIssuer(issuer, videoId, req.cookies.token)

        if (statsExist) {
            const updatedVideoStats = await updateStatsOne(req.cookies.token, { userId: issuer, videoId, watched, favorited })
            return res.status(200).json({ done: true, updatedVideoStats })
        } else {
            const newVideoStats = await addStatsOne(req.cookies.token, issuer, videoId)
            return res.status(200).json({ done: true, newVideoStats })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ done: false, error })
    }

}

export default stats