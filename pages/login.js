import Head from 'next/head'
import React from 'react'
import styles from '../styles/login.module.css'

const Login = () => {

    const handleLoginWithEmail = () => {
        console.log('clicked login')
    }

    return (
        <main className={styles.container}>
            <Head>
                <title>Nextflix SignIn</title>
            </Head>
            <div className={styles.loginUnderlay}>
                <h2 className={styles.heading}>Welcome to Nextflix</h2>
                <p className={styles.subHeading}>For the best experience login with your email address below</p>
                <input type="text" placeholder='Email Address' className={styles.emailInput}></input>
                <div className={styles.loginBtn} onClick={handleLoginWithEmail}>Login</div>
                <div className={styles.skip}>Skip login and enter site</div>
            </div>
        </main>
    )
}

export default Login