import React from 'react'
import Head from 'next/head'
import SectionCards from '../../components/card/section-cards'
import styles from '../../styles/mylist.module.css'
import { getMyListVideos } from '../../lib/videos'
import { verifyToken } from '../../lib/utils'

export async function getServerSideProps(context) {
    const token = context.req.cookies.token
    const userId = await verifyToken(token)

    const myListVideos = await getMyListVideos(userId, token)

    return {
        props: {
            myListVideos
        }
    }
}

const myList = ({ myListVideos }) => {
    return (
        <div>
            <Head><title>Nextflix: My List</title></Head>
            <section className={styles.sectionWrapper}>
                <SectionCards title="My List: Liked Videos" videos={myListVideos} size="small" shouldWrap="true" />

            </section>
        </div>
    )
}

export default myList