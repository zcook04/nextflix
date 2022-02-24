import Head from 'next/head'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { magic } from '../lib/magic-client'
import { AuthContext } from '../context/authContext'

const Login = () => {

    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(false)
    const [userMsg, setUserMsg] = useState('')
    const router = useRouter()
    const { dispatch } = useContext(AuthContext)


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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLoginWithEmail()
        }
    }

    const handleLoginWithEmail = async () => {
        if (!valid) {
            handleError('Invalid Email Address')
        } else {
            try {
                setUserMsg('Logging In')
                const token = await magic.auth.loginWithMagicLink({ email })
                if (token) {
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': "application/json",
                        }
                    })

                    const loggedInResponse = await response.json()
                    if (loggedInResponse.done) {
                        const { email } = await magic.user.getMetadata()
                        dispatch({ type: 'LOGIN', payload: email })
                        router.push('/')
                    } else {
                        handleError('Error Logging In, Try Again')
                    }

                }
            } catch (err) {
                console.error(err)
                handleError('Error Logging In')
            }
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

    useEffect(() => {
        const handleRouteComplete = () => {
            setUserMsg('')
        }
        router.events.on('routeChangeComplete', handleRouteComplete)
        router.events.on('routeChangeError', handleRouteComplete)
        return () => {
            router.events.off('routeChangeComplete', handleRouteComplete)
            router.events.off('routeChangeError', handleRouteComplete)
        }
    }, [router])

    return (
        <main className={styles.container}>
            <Head>
                <title>Nextflix SignIn</title>
            </Head>
            <div className={styles.loginUnderlay}>
                <h2 className={styles.heading}>Welcome to Nextflix</h2>
                <p className={styles.subHeading}>For the best experience login with your email address below</p>
                <div className={styles.emailWrapper}>
                    <input type="text" placeholder='Email Address' value={email} onChange={handleChange} className={styles.emailInput}
                        onKeyPress={handleKeyPress}></input>
                    <div>{valid && <Image src={'/static/icons/accept_check_white.png'} width="20px" height="20px" />}</div>
                </div>
                <div className={styles.loginBtn} onClick={handleLoginWithEmail}>{userMsg ? userMsg : 'Login'}</div>
            </div>
        </main>
    )
}

export default Login