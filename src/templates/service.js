import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { Card, Segment, Container, Grid, Header } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import PageHeader from "../components/page-header/pageHeader"
import SimpleCard from "../components/cards/simpleCard"

const style = {
  segment: {
    paddingTop: "6em",
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
  const service = props.data.contentfulService
  return (
    <Layout>
      <Head title={`Tjänst: ${props.data.contentfulService.title}`} />

      <PageHeader title={props.data.contentfulService.title} />
      <Segment style={style.segment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={11}>
                <Segment vertical>
                  <Link to="/services">&lt; Tillbaka till tjänster</Link>
                  {documentToReactComponents(
                    props.data.contentfulService.description.json
                  )}
                </Segment>
              </Grid.Column>
              <Grid.Column width={5} floated="right">
                {/* LINKED SERVICES */}
                {service.linkedServices && (
                  <Segment vertical>
                    <Header as="h3">Relaterade tjänster</Header>
                    <Card.Group>
                      {service.linkedServices.map((service, index) => {
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
                {service.linkedCourses && (
                  <Segment vertical>
                    <Header as="h3">Relaterade kurser</Header>
                    <Card.Group>
                      {service.linkedCourses.map((course, index) => {
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
                {service.linkedTools && (
                  <Segment vertical>
                    <Header as="h3">Relaterade verktyg</Header>
                    <Card.Group>
                      {service.linkedTools.map((tool, index) => {
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

export default Service
