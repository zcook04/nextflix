import styles from './section-cards.module.css'
import Card from './card'

function SectionCards(props) {
    const { title, videos, size } = props

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                {videos.map((video, i) => {
                    console.log(video)
                    return <Card imgUrl={video.imgUrl} key={i} id={i} size={size} />
                })}
            </div>
        </section>
    )
}

export default SectionCards