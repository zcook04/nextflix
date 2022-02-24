import jwt from "jsonwebtoken"

export async function verifyToken(token) {
    if (token === null || token === '' || token === undefined)
        return null
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = await decodedToken.issuer
    return userId
}