import React from "react"
import { graphql, useStaticQuery } from 'gatsby'

import { 
    Segment, 
    Container,
    Header,
    Image
} from 'semantic-ui-react'

import Layout from "../components/layout"
import Head from '../components/head'
import HomepageSection from '../components/homepage-section/homepageSection'

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
        {/* <Segment vertical textAlign="center">
            <Image alt="easy2perform" size="medium" src="/logo.svg" centered />
            <Container text>
                <Header as="h1">Vi vill göra det enklare att prestera i yrkesrollen!</Header>
            </Container>
        </Segment> */}

        {data.allContentfulHomepageSection.edges.map((edge, index) => {
            return <HomepageSection key={index} data={edge.node} />
        })}
  </Layout>
  )
}

export default IndexPage
