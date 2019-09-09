import React from "react"
import { Segment, Container, Header } from "semantic-ui-react"

const style = {
  segment: {
    paddingTop: "10em",
    paddingBottom: "6em",
  },
  link: {
    paddingTop: "2em",
    display: "inline-block",
  },
}

const PageHeader = ({ title }) => {
  return (
    <Segment
      style={style.segment}
      textAlign="center"
      vertical
      color="blue"
      inverted
    >
      <Container text>
        <Header as="h1" inverted>
          {title}
        </Header>
      </Container>
    </Segment>
  )
}

export default PageHeader
