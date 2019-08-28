import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Head from "../components/head"
import HomepageHeading from "../components/homepageHeading"
import HomepageSection from "../components/homepage-section/homepageSection"

const Wrapper = styled.div`
  background-image: url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`

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
    <Layout transparentNavigation>
      <Wrapper>
        <Head title="Startsida" />
        <HomepageHeading />
        {data.allContentfulHomepageSection.edges.map((edge, index) => {
          return <HomepageSection key={index} data={edge.node} />
        })}
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
