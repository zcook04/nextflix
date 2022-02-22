import styles from './card.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import cls from 'classnames'

function Card(props) {
    const { imgUrl = '/static/thewitcher.jpeg', size = 'medium' } = props
    const [imgSrc, setImgSrc] = useState(imgUrl)

    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
    }

    const handleError = () => {
        setImgSrc('/static/default_movie_image.jpg')
    }

    return (
        <div className={styles.container}>
            <motion.div whileHover={{ scale: 1.1 }} className={cls(classMap[size], styles.imgWrapper)}>
                <Image src={imgSrc} alt="card image" layout="fill" className={styles.cardImage} onError={handleError} />
            </motion.div>
        </div>
    )
}

export default Card