import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './navbar.module.css'



function navbar() {
    const router = useRouter()
    const [loggingOut, setLoggingOut] = useState(false)

    const handleClickUsername = () => {
        loggingOut ? setLoggingOut(false) : setLoggingOut(true)
    }

    const handleClickHome = (e) => {
        e.preventDefault()
        router.push("/")
    }

    const handleClickMyList = (e) => {
        e.preventDefault()
        router.push("/browse/my-list")
    }

    const handleClickLogout = (e) => {
        e.preventDefault()
        router.push("/logout")
    }

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
                    zack@zack-cook.com
                    <Image src='/static/icons/show_more.svg' height="12px" width="30px" alt="Show logout drop-down button" />
                </div>
                {loggingOut && <div className={styles.logout} onClick={handleClickLogout}>
                    Logout
                </div>}

            </div>
        </header>
    )
}

export default navbar