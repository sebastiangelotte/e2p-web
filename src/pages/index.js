import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"
import HomepageSection from "../components/homepage-section/homepageSection"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulHomepageSection {
        edges {
          node {
            heading
            description {
              json
            }
            buttonText
            buttonLink
            theme
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Startsida" />
      {data.allContentfulHomepageSection.edges.map((edge, index) => {
        return <HomepageSection key={index} data={edge.node} />
      })}
    </Layout>
  )
}

export default IndexPage
