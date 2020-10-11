import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import styled from "styled-components"
import { Link } from "gatsby"
import bg from "../images/hero-bg.svg"
import {
  Section,
  Heading,
  SectionWithBackgroundImage,
  Inner,
  Button,
} from "../components/new/styledComponents"

const NotFoundPage = () => (
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
        <Link to="/">
          <Button>Ta mig hem</Button>
        </Link>
      </StyledInner>
    </StyledSection>
  </Layout>
)

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
