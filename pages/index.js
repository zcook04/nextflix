import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner/Banner'
import Navbar from '../components/navbar/navbar'
import SectionCards from '../components/card/section-cards'
import { getVideos } from '../lib/videos'

export async function getServerSideProps() {
  const disneyVideos = await getVideos('Disney Movies')
  const marvelVideos = await getVideos('Marvel Movies')
  const popularVideos = await getVideos('Popular Movies')
  const travelVideos = await getVideos('Travel')
  const webDesignVideos = await getVideos('webDesign')

  return {
    props: {
      disneyVideos,
      marvelVideos,
      popularVideos,
      travelVideos,
      webDesignVideos
    }
  }
}

export default function Home(props) {
  const { disneyVideos, marvelVideos, popularVideos, travelVideos, webDesignVideos } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Nextflix.  A custom built Netflix clone using Next.js to showcase server side rendering." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner title="The Witcher" subtitle="Season 2" imgUrl="/static/thewitcher.jpeg" videoId="ndl1W4ltcmg" />
      <SectionCards title="Marvel" videos={marvelVideos} size="large" />
      <SectionCards title="Disney" videos={disneyVideos} size="small" />
      <SectionCards title="Popular" videos={popularVideos} size="medium" />
      <SectionCards title="Travel" videos={travelVideos} size="large" />
      <SectionCards title="Web Design" videos={webDesignVideos} size="small" />
    </div>
  )
}
