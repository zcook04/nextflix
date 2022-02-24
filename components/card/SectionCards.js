import styles from './section-cards.module.css'
import Card from './Card'
import Link from 'next/link'
import clsx from 'classnames'

function SectionCards(props) {
    const { title, videos = [], size, shouldWrap = false, moveUp = false } = props

    return (
        <section className={clsx(styles.container, moveUp && styles.moveUp)}>
            <h2 className={styles.title}>{title}</h2>
            <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
                {videos.map((video, i) => {
                    return (
                        <Link href={`/video/${video.id}`} key={video.id + title}><a>
                            <Card imgUrl={video.imgUrl} key={video.id + title} videoId={video.id} id={i} size={size} />
                        </a></Link>
                    )
                })}
            </div>
        </section>
    )
}

export default SectionCards