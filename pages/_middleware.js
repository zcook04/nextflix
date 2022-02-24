import { NextResponse } from "next/server"
import { verifyToken } from "../lib/utils"

export async function middleware(req, ev) {
    const token = req ? req.cookies?.token : null
    const userId = await verifyToken(token)
    const { pathname } = req.nextUrl
    const url = req.nextUrl.clone()

    if (pathname.includes('/api/login') || userId || pathname.includes('/login') || pathname.includes('/static')) {
        return NextResponse.next()
    }

    if (token && userId || pathname.includes('/api/login')) {
        return NextResponse.next()
    }

    if (!token && pathname !== '/login') {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
    return NextResponse.next()

}