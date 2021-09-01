import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"
import Head from "../components/head"
import Layout from "../components/layout"
import styled from "styled-components"
import CustomCourseContactForm from "../components/forms/customCourseContactForm"
import decoration1 from "../images/decoration1.svg"
import decoration2 from "../images/decoration2.svg"
import decoration3 from "../images/decoration3.svg"
import decoration4 from "../images/decoration4.svg"
import Hero from "../components/hero"

const CustomCourse = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPage(filter: { title: { eq: "Forma din egen kurs" } }) {
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
      <Hero
        title={page.title}
        text={documentToReactComponents(page.content.json, options)}
        narrow
      />
      <DecorationWrapper>
        <Decoration src={decoration1} alt="decoration" top={80} left={-50} />
        <Decoration src={decoration2} alt="decoration" top={300} left={-100} />
        <Decoration src={decoration3} alt="decoration" top={50} left={200} />
        <Decoration
          src={decoration4}
          alt="decoration"
          bottom={50}
          right={-48}
        />
        <FormWrapper>
          <h3>Forma din egen kurs</h3>
          <CustomCourseContactForm />
        </FormWrapper>
      </DecorationWrapper>
    </Layout>
  )
}

export default CustomCourse

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
`
