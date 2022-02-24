import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner/Banner'
import SectionCards from '../components/card/section-cards'
import { getVideos, getWatchItAgainVideos } from '../lib/videos'

export async function getServerSideProps() {
  const userId = 'did:ethr:0x5501BD0c7edd67d72E3a5b60606eaA5B2e0389F3'
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDU1MDFCRDBjN2VkZDY3ZDcyRTNhNWI2MDYwNmVhQTVCMmUwMzg5RjMiLCJwdWJsaWNBZGRyZXNzIjoiMHg1NTAxQkQwYzdlZGQ2N2Q3MkUzYTViNjA2MDZlYUE1QjJlMDM4OUYzIiwiZW1haWwiOiJ6YWNoYXJ5amNvb2tAb3V0bG9vay5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiaWF0IjoxNjQ1NzE2NDUzLCJleHAiOjE2NDYzMjEyNTMsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtSGFzdXJhLVVzZXItSWQiOiJkaWQ6ZXRocjoweDU1MDFCRDBjN2VkZDY3ZDcyRTNhNWI2MDYwNmVhQTVCMmUwMzg5RjMifX0.pJ2-_k3WaoDOtXijog3su2MRPtu8bsND0jGVkjgQFfk'
  const disneyVideos = await getVideos('Disney Movies')
  const marvelVideos = await getVideos('Marvel Movies')
  const popularVideos = await getVideos('Popular Movies')
  const travelVideos = await getVideos('Travel')
  const webDesignVideos = await getVideos('webDesign')
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
  // console.log(watchItAgainVideos)
  // console.log(disneyVideos)


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
      {/* <SectionCards title="Disney" videos={disneyVideos} size="small" />
      <SectionCards title="Popular" videos={popularVideos} size="medium" />
      <SectionCards title="Travel" videos={travelVideos} size="large" />
      <SectionCards title="Web Design" videos={webDesignVideos} size="small" /> */}
    </div>
  )
}
