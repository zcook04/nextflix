import styles from './section-cards.module.css'
import Card from './card'

function SectionCards(props) {
    const { title } = props

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                <Card imgUrl="/static/thewitcher.jpeg" size="large" id={0} />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
                <Card imgUrl="/static/thewitcher.jpeg" size="large" />
            </div>
        </section>
    )
}

export default SectionCards