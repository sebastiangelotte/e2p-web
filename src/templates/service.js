import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { Card, Icon, Segment, Container, Header, Grid } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"

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
    contentfulService(slug: { eq: $slug }) {
      title
      description {
        json
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

const Service = props => {
  return (
    <Layout>
      <Head title={`Tjänst: ${props.data.contentfulService.title}`} />

      <Segment
        style={style.segment}
        textAlign="center"
        vertical
        color="blue"
        inverted
      >
        <Container text>
          <Header as="h1" inverted>
            {props.data.contentfulService.title}
          </Header>
        </Container>
      </Segment>
      <Segment style={style.segment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={11}>
                <Segment vertical center>
                  <Link to="/services">&lt; Tillbaka till tjänster</Link>
                  {documentToReactComponents(
                    props.data.contentfulService.description.json
                  )}
                </Segment>
              </Grid.Column>
              <Grid.Column width={5} floated="right">
                {/* LINKED SERVICES */}
                {props.data.contentfulService.linkedServices && (
                  <>
                    <h3>Relaterade tjänster</h3>
                    <Card.Group>
                      {props.data.contentfulService.linkedServices.map(
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
                  </>
                )}

                {/* LINKED COURSES */}
                {props.data.contentfulService.linkedCourses && (
                  <>
                    <h3>Relaterade Kurser</h3>
                    <Card.Group>
                      {props.data.contentfulService.linkedCourses.map(
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
                  </>
                )}

                {/* LINKED TOOLS */}
                {props.data.contentfulService.linkedTools && (
                  <>
                    <h3>Relaterade verktyg</h3>
                    <Card.Group>
                      {props.data.contentfulService.linkedTools.map(
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
                  </>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Layout>
  )
}

export default Service
