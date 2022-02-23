import { mAdmin } from '../../lib/magic'

export default async function login(req, res) {
    if (req.method !== 'POST')
        return res.status(422).send({ msg: 'Invalid method.  Method must be POST', done: false })
    if (!req.headers.authorization)
        return res.status(400).send({ msg: "Token is required", done: false })

    try {
        const didToken = req.headers.authorization ? req.headers.authorization.substr(7) : ''
        const metadata = await mAdmin.users.getMetadataByToken(didToken)
        const { issuer, publicAddress, email } = metadata

        res.send({ done: true })
    } catch (error) {
        console.error('Something went wrong logging in', error)
        res.status(500).send({ done: false })
    }

}
