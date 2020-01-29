import React from "react"
import { Container, Header, Button, Icon } from "semantic-ui-react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.67);
  }
`

const ResponsiveHeader = styled.h1`
  font-size: 4em;
  color: white;

  @media only screen and (max-width: 600px) {
    font-size: 2.5em;
  }
`

const HomepageHeading = ({ mobile }) => (
  <Wrapper>
    <Container
      text
      textAlign="center"
      style={{ position: "relative", zIndex: "1" }}
    >
      <ResponsiveHeader>Easy2perform</ResponsiveHeader>
      <Header
        as="h2"
        content="Kompetensutveckling och stöd för medarbetare och chefer"
        inverted
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1.5em",
        }}
      />
      <Link to="/courses">
        <Button secondary size="big">
          Kurser
          <Icon name="right arrow" />
        </Button>
      </Link>
      <Link to="/tools">
        <Button secondary size="big">
          Verktyg
          <Icon name="right arrow" />
        </Button>
      </Link>
    </Container>
  </Wrapper>
)

export default HomepageHeading
