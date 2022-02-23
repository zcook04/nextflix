export default function login(req, res) {
    if (req.method !== 'POST')
        return res.status(422).send({ msg: 'Invalid method.  Method must be POST', done: false })
    if (!req.headers.authorization)
        return res.status(400).send({ msg: "Token is required", done: false })

    const token = req.headers.authorization ? req.headers.authorization.substr(7) : ''

    console.log(token)

    try {
        res.send({ done: true })
    } catch (error) {
        console.error('Something went wrong logging in', error)
        res.status(500).send({ done: false })
    }

}
