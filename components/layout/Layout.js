import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { useRouter } from 'next/router'

function Layout(props) {
    const router = useRouter()
    let noNav
    if (router.pathname === '/login' || router.pathname === '/_error') {
        noNav = true
    } else {
        noNav = false
    }

    return (
        <>
            {!noNav && <Navbar />}
            {props.children}
        </>
    )
}

export default Layout