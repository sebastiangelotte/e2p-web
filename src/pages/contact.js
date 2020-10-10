import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head"
import Layout from "../components/layout"
import ContactForm from "../components/contactForm"
import styled from "styled-components"
import Share from "../components/new/share"
import bg from "../images/hero-bg.svg"
import {
  Section,
  Tag,
  Heading,
  SectionWithBackgroundImage,
  Inner,
} from "../components/new/styledComponents"

const Contact = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPage(filter: { title: { eq: "Kontakta oss" } }) {
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

  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["sv-SE"]
        const url = node.data.target.fields.file["sv-SE"].url
        return <img alt={alt} src={url} />
      },
    },
  }

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
          <h2>Har du ytterligare frågor?</h2>
          {documentToReactComponents(page.content.json, options)}
          <ContactForm source={page.title} />
        </StyledInner>
      </StyledSection>
    </Layout>
  )
}

export default Contact

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
