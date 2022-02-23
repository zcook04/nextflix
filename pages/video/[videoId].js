import styles from './videoid.module.css'
import { useRouter } from 'next/router'

function VideoId() {
    const router = useRouter()
    const videoId = router.query.videoId
    return (
        <div className={styles.container}>
            <h1>Video ID Page</h1>
            <p>{videoId}</p>
        </div>
    )
}

export default VideoId