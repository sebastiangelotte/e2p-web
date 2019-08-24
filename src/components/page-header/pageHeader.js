import React from "react"
import { Segment, Container, Header } from "semantic-ui-react"

const style = {
  segment: {
    paddingTop: "6em",
    paddingBottom: "6em",
  },
  link: {
    paddingTop: "2em",
    display: "inline-block",
  },
}

const PageHeader = ({ title, date }) => {
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
        {date && <p>{date}</p>}
      </Container>
    </Segment>
  )
}

export default PageHeader
