import { mAdmin } from '../../lib/magic'
import jwt from 'jsonwebtoken'
import { isNewUser } from '../../lib/hasura'

export default async function login(req, res) {
    if (req.method !== 'POST')
        return res.status(422).send({ msg: 'Invalid method.  Method must be POST', done: false })
    if (!req.headers.authorization)
        return res.status(400).send({ msg: "Token is required", done: false })

    try {
        const didToken = req.headers.authorization ? req.headers.authorization.substr(7) : ''
        const metadata = await mAdmin.users.getMetadataByToken(didToken)

        const token = jwt.sign({
            ...metadata,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user", "admin"],
                "x-hasura-default-role": "user",
                "x-Hasura-User-Id": `${metadata.issuer}`
            }
        }, process.env.JWT_SECRET)

        const newUser = await isNewUser(token, metadata.issuer)

        res.send({ done: true, newUser })

    } catch (error) {
        console.error('Something went wrong logging in', error)
        res.status(500).send({ done: false })
    }

}
