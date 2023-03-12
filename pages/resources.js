import Image from 'next/image'
import { createClient } from 'contentful'
import ResourcesComp from '../components/ResourcesComp/ResourcesComp'

export const getStaticProps = async (context) => {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const res = await client.getEntries({ content_type: 'grantAndFunds' })
  const res2 = await client.getEntries({
    content_type: 'databaseOpp',
  })

  const res3 = await client.getEntries({
    content_type: 'practicalAdviceAndOpportunities',
  })
  return {
    props: {
      grantAndFunds: res.items,
      databaseOpp: res2.items,
      practicalAdviceAndOpportunities: res3.items,
    },
  }
}

export default function resources({
  grantAndFunds,
  practicalAdviceAndOpportunities,
  databaseOpp,
}) {
  return (
    <div>
      <ResourcesComp
        grantAndFunds={grantAndFunds}
        practicalAdviceAndOpportunities={practicalAdviceAndOpportunities}
        databaseOpp={databaseOpp}
      />
    </div>
  )
}
