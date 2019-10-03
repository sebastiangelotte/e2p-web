import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Head from "../components/head"
import HomepageHeading from "../components/homepageHeading"
import HomepageSection from "../components/homepage-section/homepageSection"

const FixedHero = styled.div`
  position: relative;
  max-height: 1000px;
  height: 800px;

  img {
    object-fit: cover;
  }

  @media only screen and (max-width: 600px) {
    max-height: 600px;
    height: 800px;
  }
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
      file(relativePath: { eq: "courses.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout transparentNavigation>
      {/* <Wrapper> */}
      <Head title="Startsida" />
      <FixedHero>
        <Img
          fluid={data.file.childImageSharp.fluid}
          style={{ position: "static" }} // fill entire height
          objectFit="cover"
        />
        <HomepageHeading />
      </FixedHero>
      {data.allContentfulHomepageSection.edges.map((edge, index) => {
        return <HomepageSection key={index} data={edge.node} />
      })}
      {/* </Wrapper> */}
    </Layout>
  )
}

export default IndexPage
