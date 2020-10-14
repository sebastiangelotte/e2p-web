import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head"
import Layout from "../components/layout"
import ContactForm from "../components/contactForm"
import styled from "styled-components"
import RelatedGrid from "../components/relatedGrid"
import Share from "../components/share"
import bg from "../images/hero-bg.svg"
import {
  Section,
  Tag,
  Heading,
  SectionWithBackgroundImage,
  Inner,
} from "../components/styledComponents"

export const query = graphql`
  query($slug: String!) {
    contentfulTool(slug: { eq: $slug }) {
      createdAt(formatString: "DD MMM, YYYY")
      title
      description {
        json
      }
      tags
      linkedServices {
        slug
        title
        tags
        internal {
          type
        }
      }
      linkedCourses {
        slug
        title
        tags
        internal {
          type
        }
      }
      linkedTools {
        slug
        title
        tags
        internal {
          type
        }
        createdAt(formatString: "DD MMM, YYYY")
      }
    }
  }
`

const Tool = props => {
  const tool = props.data.contentfulTool
  const services = props.data.contentfulTool.linkedServices || []
  const courses = props.data.contentfulTool.linkedCourses || []
  const tools = props.data.contentfulTool.linkedTools || []

  const relatedItems = [...services, ...courses, ...tools]

  return (
    <Layout>
      <Head title={`Verktyg: ${tool.title}`} />
      <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <StyledInner>
          <Heading as="h1" inverted serif>
            {tool.title}
          </Heading>
          {tool.tags?.map(tag => (
            <Tag>{tag}</Tag>
          ))}
        </StyledInner>
      </SectionWithBackgroundImage>
      <StyledSection>
        <StyledInner>
          <CreatedAt>{tool.createdAt}</CreatedAt>
          <Share title={tool.title} />
          {documentToReactComponents(tool.description.json)}
          <hr />
          <h2>Har du ytterligare frågor?</h2>
          <ContactForm source={tool.title} />
        </StyledInner>
      </StyledSection>
      {relatedItems.length !== 0 && (
        <Section gradient>
          <RelatedGrid items={relatedItems} title="Mer från easy2perform" />
        </Section>
      )}
    </Layout>
  )
}

export default Tool

const StyledSection = styled(Section)`
  p {
    font-size: 20px;
    font-family: "Crimson Text", Georgia, "Times New Roman", Times, serif;
  }

  h2,
  h3,
  h4,
  h5 {
    margin-top: 40px;
  }
`

const StyledInner = styled(Inner)`
  max-width: 680px;
`

const CreatedAt = styled.div`
  padding-bottom: 20px;
`
