import '../styles/globals.css'
import React from 'react'
import Layout from '../components/layout/Layout'
import AuthProvider from '../context/authContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
