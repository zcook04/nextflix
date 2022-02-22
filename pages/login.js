import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import styles from '../styles/login.module.css'
import Image from 'next/image'

const Login = () => {

    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(false)
    const [userMsg, setUserMsg] = useState('')

    const validate = () => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleError = (err) => {
        setUserMsg(err)
        setTimeout(() => {
            setUserMsg('')
        }, 2000);
    }

    const handleLoginWithEmail = () => {
        if (!valid) {
            handleError('Invalid Email Address')
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    useEffect(() => {
        if (validate()) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [email])

    return (
        <main className={styles.container}>
            <Head>
                <title>Nextflix SignIn</title>
            </Head>
            <div className={styles.loginUnderlay}>
                <h2 className={styles.heading}>Welcome to Nextflix</h2>
                <p className={styles.subHeading}>For the best experience login with your email address below</p>
                <div className={styles.emailWrapper}>
                    <input type="text" placeholder='Email Address' value={email} onChange={handleChange} className={styles.emailInput}></input>
                    <div>{valid && <Image src={'/static/icons/accept_check_white.png'} width="20px" height="20px" />}</div>
                </div>
                <div className={styles.loginBtn} onClick={handleLoginWithEmail}>{userMsg ? userMsg : 'Login'}</div>
                <div className={styles.skip}>Skip login and enter site</div>
            </div>
        </main>
    )
}

export default Login