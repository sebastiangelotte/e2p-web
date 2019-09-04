import React from "react"
import { graphql } from "gatsby"
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
  Modal,
} from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import PageHeader from "../components/page-header/pageHeader"
import CourseLeader from "../components/course-leader/courseLeader"
import SimpleCard from "../components/cards/simpleCard"
import CourseSignup from "../components/courseSignup"
import ContactForm from "../components/contactForm"

const style = {
  segment: {
    paddingTop: "2em",
    paddingBottom: "6em",
    backgroundColor: "#f7f7f7",
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
      numberOfDays
      city
      price
      location {
        lat
        lon
      }
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
  const locationLink =
    course.location &&
    `https://www.google.com/maps/search/?api=1&query=${course.location.lat},${course.location.lon}`

  return (
    <Layout transparentNavigation>
      <Head title={`Kurs: ${course.title}`} />
      <PageHeader title={course.title} />

      <Segment style={style.segment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={11}>
                <Segment vertical>
                  <Segment vertical>
                    <Label>
                      <Icon name="calendar alternate outline" />
                      {course.date}
                    </Label>
                    <Label>
                      <Icon name="clock outline" />
                      {course.numberOfDays} dag
                      {course.numberOfDays > 1 ? "ar" : ""}
                    </Label>
                    <Label>
                      <Icon name="map marker alternate" />
                      {course.city}
                    </Label>
                    <Label>
                      {Number(course.price).toLocaleString()} SEK exkl. moms
                    </Label>
                  </Segment>
                  {documentToReactComponents(course.description.json, options)}

                  <Modal
                    trigger={
                      <Button
                        positive
                        fluid
                        size="huge"
                        content="Anmäl dig här"
                        icon="calendar plus outline"
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
                      <CourseSignup
                        courseName={course.title}
                        courseID={course.id}
                      />
                    </Modal.Content>
                  </Modal>
                </Segment>
                <Segment>
                  <Header as="h5">
                    Önskar du få kursen genomförd som företagsintern utbildning?{" "}
                  </Header>
                  <p>
                    <i>
                      Vi anpassar kursen utifrån gruppens behov och genomför när
                      det passar er och på den ort ni önskar. Beskriv dina
                      önskemål, så sänder vi dig kostnadsfri offert.
                    </i>
                  </p>
                  <Modal
                    trigger={
                      <Button
                        fluid
                        content="Företagsintern utbildning"
                        icon="arrow right"
                        labelPosition="left"
                      />
                    }
                    closeIcon
                  >
                    <Header icon="mail" content={`Företagsintern kurs`} />
                    <Modal.Content>
                      <ContactForm source={course.title} />
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
                        {documentToReactComponents(
                          course.practicalInfo.json,
                          options
                        )}
                        <a
                          href={locationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          // https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable
                        >
                          <Button
                            content="Hitta till kurslokalen"
                            icon="external alternate"
                            labelPosition="left"
                            fluid
                          />
                        </a>
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
