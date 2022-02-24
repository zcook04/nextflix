import styles from './videoid.module.css'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { getYoutubeVideoById } from '../../lib/videos'
import Navbar from '../../components/navbar/navbar'
import Like from '../../components/icons/likeIcon'
import DisLike from '../../components/icons/dislikeIcon'
import { useState, useEffect } from 'react'

Modal.setAppElement('#__next')

export async function getStaticProps(context) {
    // const title = "The Witcher"
    // const date = "2020-01-01"
    // const views = "10k"
    // const cast = "Zachary Cook"
    // const description = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'

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

    const likeHandler = () => {
        toggleLike === 1 ? setToggleLike(0) : setToggleLike(1)
    }

    const dislikeHandler = () => {
        toggleLike === 2 ? setToggleLike(0) : setToggleLike(2)
    }

    useEffect(async () => {
        const response = await fetch('/api/stats', { method: "POST", headers: { "content-type": "application/json", "accept": "application/json" }, body: JSON.stringify({ "favorited": toggleLike, 'watched': true, videoId }) })
    }, [toggleLike])

    useEffect(() => {
        const getVideoData = async () => {
            const res = await fetch(`/api/stats?videoId=${videoId}`, { method: "Get" })
            const data = await res.json()
            if (!data.done) {
                const addVideo = fetch('/api/stats', { method: "POST", headers: { "content-type": "application/json", "accept": "application/json" }, body: JSON.stringify({ "favorited": toggleLike, 'watched': true, videoId }) })
                return
            } else {
                const favorited = data?.stats[0]?.favorited
                if (typeof favorited === 'number')
                    setToggleLike(favorited)
            }
        }
        getVideoData()
    }, [])


    return (
        <div className={styles.container}>
            <Navbar />
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