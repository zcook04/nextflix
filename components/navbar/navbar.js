import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './navbar.module.css'
import { magic } from '../../lib/magic-client'
import Link from 'next/link'
import { AuthContext } from '../../context/authContext'



function navbar() {
    const router = useRouter()
    const [showLoggingOut, setshowLoggingOut] = useState(false)

    const { dispatch, state } = useContext(AuthContext)

    const handleClickUsername = () => {
        showLoggingOut ? setshowLoggingOut(false) : setshowLoggingOut(true)
    }

    const handleClickHome = (e) => {
        e.preventDefault()
        router.push("/")
    }

    const handleClickMyList = (e) => {
        e.preventDefault()
        router.push("/browse/my-list")
    }

    const handleClickLogout = async (e) => {
        e.preventDefault()
        try {
            const token = await magic.user.getIdToken()
            dispatch({ type: "LOGOUT" })
            setshowLoggingOut(false)
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const res = await response.json();
        } catch (err) {
            console.error('error logging out', err)
            router.push('/login')
        }
    }

    useEffect(() => {
        const setUserMetadata = async () => {
            try {
                const { email } = await magic.user.getMetadata()
                dispatch({ type: "LOGIN", payload: email })
            } catch (err) {
                console.error('A problem occurred retrieving the email address', err)
            }
        }
        setUserMetadata()
    }, [])

    return (
        <header className={styles.container}>
            <div className={styles.navLeft}><span className={styles.logo} onClick={handleClickHome}>Nextflix</span></div>
            <nav className={styles.navMiddle}>
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleClickHome}>Home</li>
                    <li className={styles.navItem} onClick={handleClickMyList}>My List</li>
                </ul>
            </nav>
            <div className={styles.navRight}>
                <div className={styles.username} onClick={handleClickUsername}>
                    {state.email}
                    <Image src='/static/icons/show_more.svg' height="12px" width="30px" alt="Show logout drop-down button" />
                </div>
                {showLoggingOut && <div className={styles.logout}>
                    <Link href="/login"><a
                        onClick={handleClickLogout}>Logout</a></Link>
                </div>}

            </div>
        </header>
    )
}

export default navbar