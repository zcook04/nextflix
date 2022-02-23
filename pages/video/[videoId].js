import styles from './videoid.module.css'
import { useRouter } from 'next/router'
import Modal from 'react-modal'

Modal.setAppElement('#__next')

function VideoId() {
    const router = useRouter()
    const videoId = router.query.videoId
    return (
        <div className={styles.container}>
            <Modal
                isOpen={true}
                onRequestClose={() => router.back()}
                contentLabel="Watch this video"
                overlayClassName={styles.overlay}
                className={styles.modal}
            >
                <iframe id="player" type="text/html" width="640" height="390"
                    src={`http://www.youtube-nocookie.com/embed/${videoId}?controls=0&rel=0&autoplay=1`}
                    frameBorder="0"></iframe>
            </Modal>
        </div>
    )
}

export default VideoId