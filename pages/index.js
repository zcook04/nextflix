import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner/Banner'
import Navbar from '../components/navbar/navbar'
import SectionCards from '../components/card/section-cards'

const disneyVideos = [
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
  {
    imgUrl: "/static/thewitcher.jpeg"
  },
]


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Nextflix.  A custom built Netflix clone using Next.js to showcase server side rendering." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner title="The Witcher" subtitle="Season 2" imgUrl="/static/thewitcher.jpeg" />
      <SectionCards title="Disney" videos={disneyVideos} />
    </div>
  )
}
