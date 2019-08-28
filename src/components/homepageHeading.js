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
    background-color: #000000aa;
  }
`

const HomepageHeading = ({ mobile }) => (
  <Wrapper>
    <Container
      text
      textAlign="center"
      style={{ position: "relative", zIndex: "2" }}
    >
      <Header
        as="h1"
        content="Välkommen!"
        inverted
        style={{
          fontSize: mobile ? "2em" : "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "1.5em" : "3em",
        }}
      />
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
        <Button primary size="huge">
          Kurser
          <Icon name="right arrow" />
        </Button>
      </Link>
      <Link to="/tools">
        <Button primary size="huge">
          Verktyg
          <Icon name="right arrow" />
        </Button>
      </Link>
    </Container>
  </Wrapper>
)

export default HomepageHeading
