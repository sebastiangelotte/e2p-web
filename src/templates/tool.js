import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import {
  Card,
  Label,
  Segment,
  Container,
  Header,
  Grid,
} from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import ContactForm from "../components/contactForm"
import styled from "styled-components"

const StyledSegment = styled.div`
  padding-top: 10em;
  padding-bottom: 6em;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23030301' stroke-width='67.7' stroke-opacity='0.15' %3E%3Ccircle fill='%23179dc2' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%231794ba' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23178bb2' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%231882a9' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%231979a1' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23197098' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%231a688f' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%231a5f87' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%231a577e' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%231a4f75' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%2319476c' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23183f63' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2317375a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23153051' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23132948' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2310223f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230e1b36' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230b142e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
  text-align: center;
`

export const query = graphql`
  query($slug: String!) {
    contentfulTool(slug: { eq: $slug }) {
      title
      description {
        json
      }
      linkedServices {
        slug
        title
        tags
      }
      linkedCourses {
        slug
        title
        tags
      }
      linkedTools {
        slug
        title
        tags
      }
    }
  }
`

const Tool = props => {
  return (
    <Layout transparentNavigation>
      <Head title={`Verktyg: ${props.data.contentfulTool.title}`} />
      <StyledSegment>
        <Container text>
          <Header as="h1" inverted>
            {props.data.contentfulTool.title}
          </Header>
        </Container>
      </StyledSegment>
      <Segment vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={11}>
                <Segment vertical>
                  <Link to="/tools">&lt; Tillbaka till verktyg</Link>
                  {documentToReactComponents(
                    props.data.contentfulTool.description.json
                  )}
                </Segment>
                <Segment vertical>
                  <h2>Har du ytterligare frågor?</h2>
                  <ContactForm source={props.data.contentfulTool.title} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={5} floated="right">
                {/* LINKED SERVICES */}
                {props.data.contentfulTool.linkedServices && (
                  <>
                    <h3>Relaterade tjänster</h3>
                    <Card.Group>
                      {props.data.contentfulTool.linkedServices.map(
                        (service, index) => {
                          return (
                            <StyledCard key={index}>
                              <Card.Content>
                                <Card.Header>
                                  <Link to={`/services/${service.slug}`}>
                                    {service.title}
                                  </Link>
                                </Card.Header>
                              </Card.Content>
                              {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                              <Card.Content extra>
                                {service.tags &&
                                  service.tags.map(tag => {
                                    return (
                                      <Label key={tag} size="tiny">
                                        {tag}
                                      </Label>
                                    )
                                  })}
                              </Card.Content>
                            </StyledCard>
                          )
                        }
                      )}
                    </Card.Group>
                  </>
                )}

                {/* LINKED COURSES */}
                {props.data.contentfulTool.linkedCourses && (
                  <>
                    <h3>Relaterade Kurser</h3>
                    <Card.Group>
                      {props.data.contentfulTool.linkedCourses.map(
                        (course, index) => {
                          return (
                            <StyledCard key={index}>
                              <Card.Content>
                                <Card.Header>
                                  <Link to={`/courses/${course.slug}`}>
                                    {course.title}
                                  </Link>
                                </Card.Header>
                              </Card.Content>
                              {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                              <Card.Content extra>
                                {course.tags &&
                                  course.tags.map(tag => {
                                    return (
                                      <Label key={tag} size="tiny">
                                        {tag}
                                      </Label>
                                    )
                                  })}
                              </Card.Content>
                            </StyledCard>
                          )
                        }
                      )}
                    </Card.Group>
                  </>
                )}

                {/* LINKED TOOLS */}
                {props.data.contentfulTool.linkedTools && (
                  <>
                    <h3>Relaterade verktyg</h3>
                    <Card.Group>
                      {props.data.contentfulTool.linkedTools.map(
                        (tool, index) => {
                          return (
                            <StyledCard key={index}>
                              <Card.Content>
                                <Card.Header>
                                  <Link to={`/tools/${tool.slug}`}>
                                    {tool.title}
                                  </Link>
                                </Card.Header>
                              </Card.Content>
                              {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                              <Card.Content extra>
                                {tool.tags &&
                                  tool.tags.map(tag => {
                                    return (
                                      <Label key={tag} size="tiny">
                                        {tag}
                                      </Label>
                                    )
                                  })}
                              </Card.Content>
                            </StyledCard>
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

export default Tool

const StyledCard = styled(Card)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23010003' stroke-width='67.7' stroke-opacity='0.15' %3E%3Ccircle fill='%23b800c2' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23a520c1' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23912cbe' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%237e34ba' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%236b39b4' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23593cae' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23463ea6' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23343e9e' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23213e94' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%230a3c8a' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23003a7f' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23003874' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23003568' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%2300315c' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23002d50' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23002a45' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23082539' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230f212e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E") !important;
  background-size: 100% !important;

  a {
    color: #fff !important;
  }
`
