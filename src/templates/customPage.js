import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"
import Head from "../components/head"
import ContactForm from "../components/forms/contactForm"
import Layout from "../components/layout"
import styled from "styled-components"
import bg from "../images/section-bg.svg"
import {
  //   Heading,
  //   SectionWithBackgroundImage,
  Section,
  Inner,
} from "../components/styledComponents"
import Hero from "../components/hero"
import animation from "../animations/flying-man.json"

export const query = graphql`
  query($slug: String!) {
    customPage: contentfulCustomPage(slug: { eq: $slug }) {
      title
      showForm
      shortDescription
      animation {
        file {
          url
        }
      }
      description {
        json
      }
    }
  }
`

const CustomPage = props => {
  const customPage = props.data.customPage

  return (
    <Layout transparentNavigation>
      <Head title={`${customPage.title}`} />

      {/* <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <StyledInner>
          <Heading as="h1" inverted>
            {customPage.title}
          </Heading>
        </StyledInner>
      </SectionWithBackgroundImage> */}
      <Hero
        title={customPage.title}
        text={customPage.shortDescription}
        animation={animation}
        narrow
      />
      <StyledSection>
        <StyledInner>
          {documentToReactComponents(customPage.description.json, options)}
          <hr />
          <h3>
            Lämna dina önskemål här 👇 så återkommer vi med kostnadsfri offert!
          </h3>
          <ContactForm source={customPage.title} />
        </StyledInner>
      </StyledSection>
    </Layout>
  )
}

export default CustomPage

const StyledSection = styled(Section)`
  h2,
  h3,
  h4,
  h5 {
    margin-top: 40px;
  }

  img {
    max-width: 680px;
    width: 100%;
  }

  margin-top: -100px;
`

const StyledInner = styled(Inner)`
  //   max-width: 680px;
`
