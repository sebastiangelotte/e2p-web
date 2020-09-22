import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head"
import Layout from "../components/layout"
import ContactForm from "../components/contactForm"
import styled from "styled-components"

export const query = graphql`
  query($slug: String!) {
    contentfulTool(slug: { eq: $slug }) {
      title
      description {
        json
      }
      linkedServices {
        slug
        title
        tags
      }
      linkedCourses {
        slug
        title
        tags
      }
      linkedTools {
        slug
        title
        tags
      }
    }
  }
`

const Tool = props => {
  return (
    <Layout>
      <Head title={`Verktyg: ${props.data.contentfulTool.title}`} />
      <Wrapper>
        <Heading as="h1">{props.data.contentfulTool.title}</Heading>
      </Wrapper>
    </Layout>
  )
}

export default Tool

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const Heading = styled.h1`
  font-size: 48px;

  @media screen and (max-width: 800px) {
    font-size: 34px;
  }
`
