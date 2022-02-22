import React from 'react'
import styles from './navbar.module.css'

function navbar() {
    return (
        <nav className={styles.container}>
            <div className={styles.navLeft} >Nextflix</div>
            <div className={styles.navMiddle}>My Shows</div>
            <div className={styles.navRight}>Log In</div>
        </nav>
    )
}

export default navbar