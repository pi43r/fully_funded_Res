import { createClient } from 'contentful'
import GridComp from '../components/gridComp/gridComp'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/Footer/Footer'
import Head from 'next/head'
import ResultModal from '../components/ResultModal/ResultModal'
// import { MyDocument } from "./_document";
// import SearchBar from "../components/searchBar"
import styles from '../public/index.module.css'

export const getStaticProps = async (context) => {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const res = await client.getEntries({ content_type: 'fellowship' })

  return {
    props: {
      fellowship: res.items,
    },
  }
}

export default function Index({ fellowship, interviews }) {
  return (
    <div className={styles.container}>
      <div>
        <GridComp fellowship={fellowship} />
      </div>
    </div>
  )
}
