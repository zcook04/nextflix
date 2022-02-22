import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner/Banner'
import Navbar from '../components/navbar/navbar'
import Card from '../components/card/card'

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
      <Card imgUrl="/static/thewitcher.jpeg" size="large" />
      <Card imgUrl="/static/thewitcher.jpeg" size="medium" />
      <Card imgUrl="/static/thewitcher.jpeg" size="small" />
    </div>
  )
}
