import '../styles/reset.css'
import '../scss/mystyles.scss'
import Layout from '../components/Layout/Layout.jsx'
import '../styles/globals.css'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="page">
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}

export default MyApp
