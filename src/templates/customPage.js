import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"
import Head from "../components/head"
import Layout from "../components/layout"
import styled from "styled-components"
import { Section, Inner } from "../components/styledComponents"
import Hero from "../components/hero"
import animation from "../animations/flying-man.json"
import decoration1 from "../images/decoration1.svg"
import decoration2 from "../images/decoration2.svg"
import decoration3 from "../images/decoration3.svg"
import decoration4 from "../images/decoration4.svg"
import CustomCourseContactForm from "../components/forms/customCourseContactForm"
import Share from "../components/share"

export const query = graphql`
  query($slug: String!) {
    customPage: contentfulCustomPage(slug: { eq: $slug }) {
      title
      showForm
      shortDescription {
        shortDescription
      }
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
      <Hero
        title={customPage.title}
        text={customPage.shortDescription?.shortDescription}
        animation={animation}
        narrow
      />
      <Grid>
        <StyledSection>
          <StyledInner>
            <Share style={{ marginTop: "-40px", paddingBottom: "20px" }} />
            {documentToReactComponents(customPage.description.json, options)}
            <hr />
          </StyledInner>
        </StyledSection>
        <DecorationWrapper>
          <Decoration src={decoration1} alt="decoration" top={80} left={-50} />
          <Decoration
            src={decoration2}
            alt="decoration"
            top={300}
            left={-100}
          />
          <Decoration src={decoration3} alt="decoration" top={50} left={200} />
          <Decoration
            src={decoration4}
            alt="decoration"
            bottom={50}
            right={-48}
          />
          <FormWrapper>
            <h3>Önskar du förslag på kursupplägg & pris?</h3>
            <p>
              Beskriv kort behovet av kompetensutveckling, målgruppen, antal
              deltagare och om du önskar genomförande på plats, digitalt eller
              en kombination, så sänder vi dig ett kostnadsförslag.
            </p>
            <CustomCourseContactForm />
          </FormWrapper>
        </DecorationWrapper>
      </Grid>
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

  padding-top: 0;
`

const StyledInner = styled(Inner)`
  //   max-width: 680px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  align-items: flex-start;
  grid-auto-rows: 1fr;
  max-width: 1280px;
  margin: 0 auto;

  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`

const DecorationWrapper = styled.div`
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

const Decoration = styled.img`
  pointer-events: none;
  position: absolute;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  z-index: -1;
`

const FormWrapper = styled.article`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  padding: 20px 30px 15px 30px;
  background-color: #fff;
  border-radius: 18px;
  color: var(--color-heading);
  max-width: 540px;
`
