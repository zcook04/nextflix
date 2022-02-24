import jwt from 'jsonwebtoken'
import { findVideoByIssuer } from '../../lib/hasura'

const stats = async (req, res) => {
    if (req.method !== "POST")
        return res.status(422).json({ err: "Bad method" })

    try {
        if (!req.cookies.token)
            return res.status(403).json({ err: "Cookie required but not found" })

        const { videoId } = req.query
        const { issuer } = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

        const videoFound = await findVideoByIssuer(issuer, videoId, req.cookies.token)
        return res.status(200).json({ msg: 'success', videoFound })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ done: false, error: error.msg })
    }

}

export default stats