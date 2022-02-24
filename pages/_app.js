import '../styles/globals.css'
import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import AuthProvider from '../context/authContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(async () => {
  //   const isLoggedIn = await magic.user.isLoggedIn()
  //   if (isLoggedIn) {
  //     router.push('/')
  //   } else {
  //     router.push('/login')
  //   }
  // }, [])

  // useEffect(() => {
  //   const handleRouteComplete = () => {
  //     setIsLoading(false)
  //   }

  //   router.events.on('routeChangeComplete', handleRouteComplete)
  //   router.events.on('routeChangeError', handleRouteComplete)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteComplete)
  //     router.events.off('routeChangeError', handleRouteComplete)
  //   }
  // }, [router])

  // return isLoading ? <Loading /> : <Component {...pageProps} />

  return (
    <AuthProvider>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
