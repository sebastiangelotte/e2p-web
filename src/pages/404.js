import React from "react"
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
import Lottie from "react-lottie-player"
import animation from "../animations/404.json"

const NotFoundPage = () => {
  return (
    <Layout transparentNavigation>
      <Head title="404: Hittar ej sidan" />
      <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <StyledInner>
          <Heading as="h1" inverted>
            404: Hittar ej sidan
          </Heading>
        </StyledInner>
      </SectionWithBackgroundImage>
      <StyledSection background>
        <StyledInner>
          <Lottie loop play animationData={animation} renderer="svg" />
        </StyledInner>
      </StyledSection>
    </Layout>
  )
}

export default NotFoundPage

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

const StyledInner = styled(Inner)`
  display: flex;
  align-items: center;
  justify-content: center;
`
