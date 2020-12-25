import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"
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
import Profile from "../components/profile"
import { BsArrowLeftShort } from "react-icons/bs"

export const query = graphql`
  query($slug: String!) {
    contentfulTool(slug: { eq: $slug }) {
      shortDate: createdAt(formatString: "DD MMM YYYY")
      fullDate: createdAt(formatString: "DD MMMM YYYY")
      title
      shortDescription
      description {
        json
        fields {
          readingTime {
            minutes
          }
        }
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
      author {
        slug
        name
        title
        description {
          json
        }
        image {
          title
          fixed(width: 400) {
            width
            height
            src
          }
        }
      }
    }
  }
`

const Tool = props => {
  const tool = props.data.contentfulTool
  const services = props.data.contentfulTool.linkedServices || []
  const courses = props.data.contentfulTool.linkedCourses || []
  const tools = props.data.contentfulTool.linkedTools || []
  const author = props.data.contentfulTool.author

  const relatedItems = [...services, ...courses, ...tools]
  const readingTime = Math.ceil(tool.description.fields.readingTime.minutes)

  return (
    <Layout>
      <Head title={`${tool.title}`} description={tool.shortDescription} />
      <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <Inner>
          <BackButton to="/tools">
            <BsArrowLeftShort /> Alla artiklar
          </BackButton>
          <Heading as="h1" inverted>
            {tool.title}
          </Heading>
          <p>{tool.shortDescription}</p>
          {tool.author && <Profile profile={author} />}
        </Inner>
      </SectionWithBackgroundImage>
      <StyledSection>
        <StyledInner>
          <MetaWrapper>
            <Meta>
              <Date dateTime={tool.fullDate} title={tool.fullDate}>
                {tool.shortDate}
              </Date>
              <Separator>·</Separator>
              <ReadingTime>{readingTime} min läsning</ReadingTime>
            </Meta>
          </MetaWrapper>
          <Share title={tool.title} />
          {documentToReactComponents(tool.description.json, options)}
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
    font-size: 18px;
    font-family: "Crimson Text", Georgia, "Times New Roman", Times, serif;
  }

  p + h2,
  p + h3,
  p + h4,
  p + h5 {
    margin-top: 40px;
  }
`

const StyledInner = styled(Inner)`
  * {
    max-width: 680px;
  }
`

const CreatedAt = styled.div`
  padding-bottom: 20px;
`

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }

  > svg {
    font-size: 24px;
  }
`

const MetaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: auto;

  > * {
    margin-bottom: 10px;
  }
`

const Meta = styled.div`
  display: flex;
  gap: 5px;
`

const Separator = styled.span``

const Date = styled.time``

const ReadingTime = styled.span``
