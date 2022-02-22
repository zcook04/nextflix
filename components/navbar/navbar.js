import React, { useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'



function navbar() {
    const [loggingOut, setLoggingOut] = useState(false)

    const usernameHandler = () => {
        loggingOut ? setLoggingOut(false) : setLoggingOut(true)
    }
    return (
        <header className={styles.container}>
            <div className={styles.navLeft}><span className={styles.logo}>Nextflix</span></div>
            <nav className={styles.navMiddle}>
                <ul className={styles.navItems}>
                    <li className={styles.navItem}>Home</li>
                    <li className={styles.navItem}>My Shows</li>
                </ul>
            </nav>
            <div className={styles.navRight}>
                <div className={styles.username} onClick={usernameHandler}>
                    zack@zack-cook.com
                </div>
                {loggingOut && <div className={styles.logout}>
                    <Link href='/logout'>Logout</Link>
                </div>}

            </div>
        </header>
    )
}

export default navbar