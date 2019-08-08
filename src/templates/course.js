import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import {
  Card,
  Icon,
  Segment,
  Container,
  Header,
  Button,
  Grid,
  Label,
} from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import CourseLeader from "../components/course-leader/courseLeader"

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

export const query = graphql`
  query($slug: String!) {
    contentfulCourse(slug: { eq: $slug }) {
      title
      date(formatString: "MMM Do, YYYY")
      description {
        json
      }
      practicalInfo {
        json
      }
      includedInfo {
        json
      }
      courseLeader {
        name
        title
        description {
          json
        }
        image {
          title
          fixed(width: 400) {
            width
            height
            src
          }
        }
      }
      linkedServices {
        slug
        title
      }
      linkedCourses {
        slug
        title
      }
      linkedTools {
        slug
        title
      }
    }
  }
`

const Course = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["sv-SE"]
        const url = node.data.target.fields.file["sv-SE"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout>
      <Head title={`Kurs: ${props.data.contentfulCourse.title}`} />
      <Segment
        style={style.segment}
        textAlign="center"
        vertical
        color="blue"
        inverted
      >
        <Container text>
          <Header as="h1" inverted>
            {props.data.contentfulCourse.title}
          </Header>
          <p>{props.data.contentfulCourse.date}</p>
        </Container>
      </Segment>
      <Segment style={style.segment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={11}>
                <Segment vertical center>
                  {documentToReactComponents(
                    props.data.contentfulCourse.description.json,
                    options
                  )}
                  <Link style={style.link} to="/">
                    <Button
                      primary
                      content="Anmäl dig här"
                      icon="arrow right"
                      labelPosition="left"
                    />
                  </Link>
                </Segment>
              </Grid.Column>
              <Grid.Column width={5} floated="right">
                {props.data.contentfulCourse.practicalInfo && (
                  <Segment vertical center>
                    <Header as="h3">Praktisk information</Header>
                    <Card fluid color="orange">
                      <Card.Content>
                        <Label>
                          <Icon name="calendar" />
                          {props.data.contentfulCourse.date}
                        </Label>
                        {documentToReactComponents(
                          props.data.contentfulCourse.practicalInfo.json,
                          options
                        )}
                      </Card.Content>
                    </Card>
                  </Segment>
                )}
                {props.data.contentfulCourse.includedInfo && (
                  <Segment vertical center>
                    <Header as="h3">Vad ingår i kursen?</Header>
                    <Card fluid color="orange">
                      <Card.Content>
                        {documentToReactComponents(
                          props.data.contentfulCourse.includedInfo.json,
                          options
                        )}
                      </Card.Content>
                    </Card>
                  </Segment>
                )}
                <Segment vertical center>
                  <Header as="h3">Kursledare</Header>
                  {props.data.contentfulCourse.courseLeader && (
                    <CourseLeader
                      data={props.data.contentfulCourse.courseLeader}
                    />
                  )}
                </Segment>
                {/* LINKED SERVICES */}
                {props.data.contentfulCourse.linkedServices && (
                  <Segment vertical center>
                    <Header as="h3">Relaterade tjänster</Header>
                    <Card.Group>
                      {props.data.contentfulCourse.linkedServices.map(
                        (service, index) => {
                          return (
                            <Card key={index}>
                              <Card.Content>
                                <Card.Header>
                                  <Link to={`/services/${service.slug}`}>
                                    {service.title}
                                  </Link>
                                </Card.Header>
                              </Card.Content>
                              {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                              <Card.Content extra>
                                <Icon name="user" />
                                Extra info
                              </Card.Content>
                            </Card>
                          )
                        }
                      )}
                    </Card.Group>
                  </Segment>
                )}

                {/* LINKED COURSES */}
                {props.data.contentfulCourse.linkedCourses && (
                  <Segment vertical center>
                    <Header as="h3">Relaterade kurser</Header>
                    <Card.Group>
                      {props.data.contentfulCourse.linkedCourses.map(
                        (course, index) => {
                          return (
                            <Card key={index}>
                              <Card.Content>
                                <Card.Header>
                                  <Link to={`/courses/${course.slug}`}>
                                    {course.title}
                                  </Link>
                                </Card.Header>
                              </Card.Content>
                              {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                              <Card.Content extra>
                                <Icon name="user" />
                                Extra info
                              </Card.Content>
                            </Card>
                          )
                        }
                      )}
                    </Card.Group>
                  </Segment>
                )}

                {/* LINKED TOOLS */}
                {props.data.contentfulCourse.linkedTools && (
                  <Segment vertical center>
                    <Header as="h3">Relaterade verktyg</Header>
                    <Card.Group>
                      {props.data.contentfulCourse.linkedTools.map(
                        (tool, index) => {
                          return (
                            <Card key={index}>
                              <Card.Content>
                                <Card.Header>
                                  <Link to={`/tools/${tool.slug}`}>
                                    {tool.title}
                                  </Link>
                                </Card.Header>
                              </Card.Content>
                              {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                              <Card.Content extra>
                                <Icon name="user" />
                                Extra info
                              </Card.Content>
                            </Card>
                          )
                        }
                      )}
                    </Card.Group>
                  </Segment>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Layout>
  )
}

export default Course
