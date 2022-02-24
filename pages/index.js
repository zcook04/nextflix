import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner/Banner'
import SectionCards from '../components/card/section-cards'
import { getVideos, getWatchItAgainVideos } from '../lib/videos'
import { verifyToken } from '../lib/utils'

export async function getServerSideProps(context) {
  const token = context.req.cookies.token
  const userId = await verifyToken(token)
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  const disneyVideos = await getVideos('Disney Trailers')
  const marvelVideos = await getVideos('Marvel Trailers')
  const popularVideos = await getVideos('Popular')
  const travelVideos = await getVideos('Travel')
  const webDesignVideos = await getVideos('webDesign')
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)



  return {
    props: {
      disneyVideos,
      marvelVideos,
      popularVideos,
      travelVideos,
      webDesignVideos,
      watchItAgainVideos,
    }
  }
}



export default function Home(props) {
  const { disneyVideos, marvelVideos, watchItAgainVideos, popularVideos, travelVideos, webDesignVideos } = props
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Nextflix.  A custom built Netflix clone using Next.js to showcase server side rendering." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner title="The Witcher" subtitle="Season 2" imgUrl="/static/thewitcher.jpeg" videoId="ndl1W4ltcmg" />
      <SectionCards title="Marvel" videos={marvelVideos} size="large" />
      <SectionCards title="Watch It Again" videos={watchItAgainVideos} size="small" />
      <SectionCards title="Disney" videos={disneyVideos} size="small" />
      <SectionCards title="Popular" videos={popularVideos} size="medium" />
      <SectionCards title="Travel" videos={travelVideos} size="large" />
      <SectionCards title="Web Design" videos={webDesignVideos} size="small" />
    </div>
  )
}
