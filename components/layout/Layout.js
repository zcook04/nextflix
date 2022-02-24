import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { useRouter } from 'next/router'

function Layout(props) {
    const router = useRouter()
    const showNavbar = router.pathname === '/login' ? false : true

    return (
        <>
            {showNavbar && <Navbar />}
            {props.children}
        </>
    )
}

export default Layout