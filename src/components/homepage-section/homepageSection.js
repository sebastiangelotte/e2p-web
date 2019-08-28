import React from "react"
import { Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { Segment, Container, Header, Button } from "semantic-ui-react"

const style = {
  segment: {
    paddingTop: "6em",
    paddingBottom: "6em",
  },
  whiteSegment: {
    backgroundColor: "white",
    paddingTop: "6em",
    paddingBottom: "6em",
  },
  link: {
    paddingTop: "2em",
    display: "inline-block",
  },
}

const HomepageSection = props => {
  const isInverted = props.data.theme === "white" ? false : true

  return (
    <Segment
      style={isInverted ? style.segment : style.whiteSegment}
      textAlign="center"
      vertical
      color={props.data.theme}
      inverted={isInverted}
    >
      <Container text>
        <Header as="h2" inverted={isInverted}>
          {props.data.heading}
        </Header>
        <div>{documentToReactComponents(props.data.description.json)}</div>
        {props.data.buttonLink && props.data.buttonText && (
          <Link style={style.link} to={props.data.buttonLink}>
            <Button
              content={props.data.buttonText}
              icon="arrow right"
              labelPosition="left"
            />
          </Link>
        )}
      </Container>
    </Segment>
  )
}

export default HomepageSection
