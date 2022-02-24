import styles from './section-cards.module.css'
import Card from './card'
import Link from 'next/link'
import clsx from 'classnames'

function SectionCards(props) {
    const { title, videos = [], size, shouldWrap = false } = props


    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
                {videos.map((video, i) => {
                    return (
                        <Link href={`/video/${video.id}`} key={video.id}><a>
                            <Card imgUrl={video.imgUrl} key={i} id={i} size={size} />
                        </a></Link>
                    )
                })}
            </div>
        </section>
    )
}

export default SectionCards