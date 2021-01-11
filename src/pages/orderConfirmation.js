// window.history.state

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"
import Head from "../components/head"
import Layout from "../components/layout"
import styled from "styled-components"
import bg from "../images/hero-bg.svg"
import {
  Section,
  Heading,
  SectionWithBackgroundImage,
  Inner,
} from "../components/styledComponents"

const OrderConfirmation = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPage(filter: { title: { eq: "Bokningsbekräftelse" } }) {
        edges {
          node {
            title
            content {
              json
            }
          }
        }
      }
    }
  `)

  const page = data.allContentfulPage.edges[0].node

  return (
    <Layout transparentNavigation>
      <Head title={page.title} />
      <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <StyledInner>
          <Heading as="h1" inverted>
            {page.title}
          </Heading>
        </StyledInner>
      </SectionWithBackgroundImage>
      <StyledSection background>
        <StyledInner>
          {documentToReactComponents(page.content.json, options)}
        </StyledInner>
      </StyledSection>
    </Layout>
  )
}

export default OrderConfirmation

const StyledSection = styled(Section)`
  p {
    font-size: 20px;
  }

  h2,
  h3,
  h4,
  h5 {
    margin-top: 40px;
  }
`

const StyledInner = styled(Inner)``
