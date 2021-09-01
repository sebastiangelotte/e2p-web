import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head"
import Layout from "../components/layout"
import ContactForm from "../components/forms/contactForm"
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
import { options } from "../richTextRendererOptions"

export const query = graphql`
  query($slug: String!) {
    contentfulService(slug: { eq: $slug }) {
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
        title
        slug
        tags
        companyInternalCourse
        onlineCourse
        onSite
        shortDescription

        courseLeaders: courseLeadersOpenCourse {
          slug
          name
          title
          image {
            title
            fixed(width: 400) {
              width
              height
              src
            }
          }
        }
        internal {
          type
        }
      }
      linkedTools {
        slug
        title
        shortDescription
        tags
        description {
          json
          fields {
            readingTime {
              minutes
            }
          }
        }
        shortDate: createdAt(formatString: "DD MMM")
        fullDate: createdAt(formatString: "DD MMMM YYYY")
        author {
          slug
          name
          title
          image {
            title
            fixed(width: 400) {
              width
              height
              src
            }
          }
        }
        internal {
          type
        }
      }
    }
  }
`

const Service = props => {
  const service = props.data.contentfulService
  const services = props.data.contentfulService.linkedServices || []
  const courses = props.data.contentfulService.linkedCourses || []
  const tools = props.data.contentfulService.linkedTools || []

  const relatedItems = [...services, ...courses, ...tools]

  return (
    <Layout transparentNavigation>
      <Head title={`Tjänst: ${service.title}`} />

      <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <StyledInner>
          <Heading as="h1" inverted serif>
            {service.title}
          </Heading>
          {service.tags?.map(tag => (
            <Tag>{tag}</Tag>
          ))}
        </StyledInner>
      </SectionWithBackgroundImage>
      <StyledSection>
        <StyledInner>
          <Share title={service.title} />
          {documentToReactComponents(service.description.json, options)}
          <hr />
          <h2>Har du ytterligare frågor?</h2>
          <ContactForm source={service.title} />
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

export default Service

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
