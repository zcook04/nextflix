import React, { useState, useEffect } from 'react'
import styles from './Banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Banner(props) {
    const { title, imgUrl, videoId, description } = props.bannerData
    const router = useRouter()

    const playHandler = () => {
        router.push(`/video/${videoId}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonPrimary} onClick={playHandler}>
                        <Image src='/static/icons/play_circle_black.svg' width='30px' height='30px' alt="Play Button" />Play
                    </button>
                </div>
            </div>
            <div className={styles.image} style={{ backgroundImage: `url(${imgUrl})`, width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "50% 50%", position: 'absolute', top: '0' }}></div>
            <div className={styles.overlay}></div>
        </div>
    )
}

export default Banner