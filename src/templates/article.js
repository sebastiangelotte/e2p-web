import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES } from "@contentful/rich-text-types"
import { Card, Segment, Container, Grid, Label } from "semantic-ui-react"
import ContactForm from "../components/contactForm"
import Head from "../components/head"
import Layout from "../components/layout"
import PageHeader from "../components/page-header/pageHeader"
import styled from "styled-components"

export const query = graphql`
  query($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      date(formatString: "D/M/YYYY")
      description {
        json
      }
      relateradeKurser {
        slug
        title
      }
      relateradeVerktyg {
        slug
        title
      }
    }
  }
`

const Article = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title.sv
        const url = node.data.target.fields.file.sv.url
        return <img alt={alt} src={url} />
      },
      [INLINES.HYPERLINK]: node => {
        console.log("asdasd", node)
        if (node.data.uri.indexOf("youtube.com") !== -1) {
          return (
            <iframe
              title="video"
              width="100%"
              height="400"
              src={node.data.uri}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )
        }
      },
    },

  }

  return (
    <Layout transparentNavigation>
      <Head title={`Artikel: ${props.data.contentfulArticle.title}`} />

      <PageHeader title={props.data.contentfulArticle.title} />
      <Segment vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={11}>
                <Segment vertical>
                  <h3>Publicerat: {props.data.contentfulArticle.date}</h3>
                  {documentToReactComponents(
                    props.data.contentfulArticle.description.json,
                    options
                  )}
                </Segment>
                <Segment vertical>
                  <h2>Undrar du något?</h2>
                  <p>
                    Skicka ett meddelande till oss så hör vi av oss så snart vi
                    kan.
                  </p>
                  <ContactForm source={props.data.contentfulArticle.title} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={5} floated="right">
                {/* LINKED COURSES */}
                {props.data.contentfulArticle.relateradeKurser && (
                  <>
                    <h3>Relaterade Kurser</h3>
                    <Card.Group>
                      {props.data.contentfulArticle.relateradeKurser.map(
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
                {props.data.contentfulArticle.relateradeVerktyg && (
                  <>
                    <h3>Relaterade verktyg</h3>
                    <Card.Group>
                      {props.data.contentfulArticle.relateradeVerktyg.map(
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

export default Article

const StyledCard = styled(Card)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23010003' stroke-width='67.7' stroke-opacity='0.15' %3E%3Ccircle fill='%23b800c2' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23a520c1' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23912cbe' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%237e34ba' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%236b39b4' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23593cae' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23463ea6' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23343e9e' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23213e94' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%230a3c8a' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23003a7f' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23003874' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23003568' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%2300315c' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23002d50' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23002a45' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23082539' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230f212e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E") !important;
  background-size: 300% !important;

  a {
    color: #fff !important;
  }
`
