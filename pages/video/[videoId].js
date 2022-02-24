import styles from './videoid.module.css'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { getYoutubeVideoById } from '../../lib/videos'
import Like from '../../components/icons/likeIcon'
import DisLike from '../../components/icons/dislikeIcon'
import { useState, useEffect } from 'react'

Modal.setAppElement('#__next')

export async function getStaticProps(context) {
    const videoId = context.params.videoId
    const videoArray = await getYoutubeVideoById(videoId)

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {}
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    const listOfVideos = ['ndl1W4ltcmg', 'XdKzUbAiswE', 'CaimKeDcudo']
    const paths = listOfVideos.map((videoId) => {
        return { params: { videoId } }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

function VideoId({ video }) {
    const router = useRouter()
    const videoId = router.query.videoId

    const { title, date, description, views } = video
    const formattedDate = new Date(date).toLocaleDateString()

    const [toggleLike, setToggleLike] = useState(0)

    const likeHandler = async () => {
        const newLikeValue = toggleLike === 1 ? 0 : 1
        setToggleLike(newLikeValue)
        const payload = {
            "favorited": newLikeValue,
            "watched": true,
            "videoId": videoId
        }
        fetch('/api/stats', { method: "POST", headers: { "content-type": "application/json", "accept": "application/json" }, body: JSON.stringify(payload) })
    }

    const dislikeHandler = async () => {
        const newLikeValue = toggleLike === 2 ? 0 : 2
        setToggleLike(newLikeValue)
        const payload = {
            "favorited": newLikeValue,
            "watched": true,
            "videoId": videoId
        }
        fetch('/api/stats', { method: "POST", headers: { "content-type": "application/json", "accept": "application/json" }, body: JSON.stringify(payload) })
    }

    useEffect(() => {
        const getVideoData = async () => {
            const res = await fetch(`/api/stats?videoId=${videoId}`, { method: "Get" })
            const data = await res.json()
            const favorited = data?.stats[0]?.favorited
            if (typeof favorited === 'number')
                setToggleLike(favorited)
        }
        getVideoData()
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.wrapper} id="modal_wrapper">
                <Modal
                    isOpen={true}
                    onRequestClose={() => router.back()}
                    contentLabel="Watch this video"
                    overlayClassName={styles.overlay}
                    className={styles.modal}>

                    <iframe id="player" type="text/html" width="640" height="390"
                        src={`http://www.youtube-nocookie.com/embed/${videoId}?controls=0&rel=0&autoplay=1&fs=1`}
                        frameBorder="0" className={styles.videoPlayer} />

                    <article className={styles.modalBodyGrid}>
                        <section className={styles.modalLeftFlex}>
                            <div className={styles.modalVideoTitle}>
                                {title}
                            </div>
                            <div className={styles.modalSubInfoFlex} >
                                <div className={styles.modalVideoViewCount}><span className={styles.modalKeyText}>Views:</span><span className={styles.modalValueText}>{views}</span></div>
                                <div className={styles.modalVideoDate}><span className={styles.modalKeyText}>Date:</span><span className={styles.modalValueText}>{formattedDate}</span></div>
                                <div className={styles.likeDislikeBtnWrapper}>
                                    <button className={styles.btn} onClick={likeHandler}>
                                        <div className={styles.btnWrapper}>
                                            <Like width="15px" height="15px" selected={toggleLike === 1} />
                                        </div>
                                    </button>
                                    <button className={styles.btn} onClick={dislikeHandler}>
                                        <div className={styles.btnWrapper}>
                                            <DisLike width="15px" height="15px" selected={toggleLike === 2} />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.modalVideoDescription}>
                                {description}
                            </div>
                        </section>
                    </article>

                </Modal>
            </div>
        </div>
    )
}

export default VideoId