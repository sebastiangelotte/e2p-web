import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

// import { Auth, API, graphqlOperation } from "aws-amplify"
// import * as mutations from "../graphql/mutations"
// import * as queries from "../graphql/queries"

import {
  Card,
  Icon,
  Segment,
  Container,
  Header,
  Button,
  Grid,
  Label,
  Modal,
} from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import PageHeader from "../components/page-header/pageHeader"
import CourseLeader from "../components/course-leader/courseLeader"
import SimpleCard from "../components/cards/simpleCard"
import CourseSignup from "../components/courseSignup"

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
      id
      title
      date(formatString: "D/M/YYYY")
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

  const course = props.data.contentfulCourse

  //   const registerToCourse = async () => {
  //     Auth.currentAuthenticatedUser().then(user => {
  //       API.graphql(
  //         graphqlOperation(queries.getUserData, {
  //           id: user.username,
  //         })
  //       ).then(user => {
  //         API.graphql(
  //           graphqlOperation(mutations.updateUserData, {
  //             input: {
  //               id: user.data.getUserData.id,
  //               courses: [...user.data.getUserData.courses, course.id],
  //             },
  //           })
  //         )
  //       })
  //     })
  //   }

  return (
    <Layout>
      <Head title={`Kurs: ${course.title}`} />
      <PageHeader title={course.title} date={course.date} />
      <Segment style={style.segment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={11}>
                <Segment vertical>
                  {documentToReactComponents(course.description.json, options)}

                  <Modal
                    trigger={
                      <Button
                        primary
                        content="Anmäl dig här"
                        icon="arrow right"
                        labelPosition="left"
                      />
                    }
                    closeIcon
                  >
                    <Header
                      icon="calendar plus outline"
                      content={`Anmäl dig till kursen`}
                    />
                    <Header
                      as="h5"
                      icon="info circle"
                      content={`${course.title} (${course.date})`}
                    />
                    <Modal.Content>
                      <CourseSignup />
                    </Modal.Content>
                  </Modal>
                </Segment>
              </Grid.Column>
              <Grid.Column width={5} floated="right">
                {course.practicalInfo && (
                  <Segment vertical>
                    <Header as="h3">Praktisk information</Header>
                    <Card fluid color="orange">
                      <Card.Content>
                        <Label>
                          <Icon name="calendar" />
                          {course.date}
                        </Label>
                        {documentToReactComponents(
                          course.practicalInfo.json,
                          options
                        )}
                      </Card.Content>
                    </Card>
                  </Segment>
                )}
                {course.includedInfo && (
                  <Segment vertical>
                    <Header as="h3">Vad ingår i kursen?</Header>
                    <Card fluid color="orange">
                      <Card.Content>
                        {documentToReactComponents(
                          course.includedInfo.json,
                          options
                        )}
                      </Card.Content>
                    </Card>
                  </Segment>
                )}
                <Segment vertical>
                  <Header as="h3">Kursledare</Header>
                  {course.courseLeader && (
                    <CourseLeader data={course.courseLeader} />
                  )}
                </Segment>
                {/* LINKED SERVICES */}
                {course.linkedServices && (
                  <Segment vertical>
                    <Header as="h3">Relaterade tjänster</Header>
                    <Card.Group>
                      {course.linkedServices.map((service, index) => {
                        return (
                          <SimpleCard
                            title={service.title}
                            link={`/services/${service.slug}`}
                            key={index}
                          />
                        )
                      })}
                    </Card.Group>
                  </Segment>
                )}

                {/* LINKED COURSES */}
                {course.linkedCourses && (
                  <Segment vertical>
                    <Header as="h3">Relaterade kurser</Header>
                    <Card.Group>
                      {course.linkedCourses.map((course, index) => {
                        return (
                          <SimpleCard
                            title={course.title}
                            link={`/courses/${course.slug}`}
                            key={index}
                          />
                        )
                      })}
                    </Card.Group>
                  </Segment>
                )}

                {/* LINKED TOOLS */}
                {course.linkedTools && (
                  <Segment vertical>
                    <Header as="h3">Relaterade verktyg</Header>
                    <Card.Group>
                      {course.linkedTools.map((tool, index) => {
                        return (
                          <SimpleCard
                            title={tool.title}
                            link={`/tools/${tool.slug}`}
                            key={index}
                          />
                        )
                      })}
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
