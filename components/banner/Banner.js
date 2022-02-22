import React from 'react'
import styles from './Banner.module.css'
import Image from 'next/image'

function Banner(props) {
    const { title, imgUrl } = props
    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonPrimary}>
                        <Image src='/static/icons/play_icon.svg' width='40px' height='40px' alt="Play Button" />Play
                    </button>
                    <button className={styles.buttonSecondary}>
                        <Image src='/static/icons/info_icon.svg' width='30px' height='30px' alt="More Info Button" />More Info
                    </button>
                </div>
            </div>
            <div className={styles.image} style={{ backgroundImage: `url(${imgUrl})`, width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "50% 50%", position: 'absolute', top: '0' }}></div>
            <div className={styles.overlay}></div>
        </div>
    )
}

export default Banner