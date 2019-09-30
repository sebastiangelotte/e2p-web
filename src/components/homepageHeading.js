import React from "react"
import { Container, Header, Button, Icon } from "semantic-ui-react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;

  position: relative;

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
  font-weight: normal;
  margin-bottom: 0;
  margin-top: 3em !important;
  color: white;

  @media only screen and (max-width: 600px) {
    font-size: 2.5em;
    margin-top: 4em !important;
  }
`

const HomepageHeading = ({ mobile }) => (
  <Wrapper>
    <Container
      text
      textAlign="center"
      style={{ position: "relative", zIndex: "1" }}
    >
      <ResponsiveHeader>Välkommen!</ResponsiveHeader>
      <Header
        as="h2"
        content="Easy2perform utvecklar och genomför inspirerande kurser för din utveckling."
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em",
        }}
      />
      <Link to="/courses">
        <Button primary size="big">
          Kurser
          <Icon name="right arrow" />
        </Button>
      </Link>
      <Link to="/tools">
        <Button primary size="big">
          Verktyg
          <Icon name="right arrow" />
        </Button>
      </Link>
    </Container>
  </Wrapper>
)

export default HomepageHeading
