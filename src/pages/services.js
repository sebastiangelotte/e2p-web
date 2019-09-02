import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Card, Segment, Container, Header, Label } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import Filter from "../components/filter"

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

const Services = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulService {
        edges {
          node {
            slug
            title
            tags
            shortDescription {
              shortDescription
            }
            description {
              json
            }
          }
        }
      }
    }
  `)

  const [services, setServices] = useState(data.allContentfulService.edges)

  const updateServices = services => {
    if (services.length > 0) {
      setServices(services)
    } else {
      setServices(data.allContentfulService.edges) // reset state
    }
  }

  return (
    <Layout transparentNavigation>
      <Head title="Verktyg" />
      <Segment
        style={style.segment}
        textAlign="center"
        vertical
        color="blue"
        inverted
      >
        <Container text>
          <Header as="h1" inverted>
            Problemlösande tjänster
          </Header>
          <div>
            <p>
              Easy2perform erbjuder konsulttjänster för utveckling av
              organisation, chefer & medarbetare.
            </p>
            <Filter
              data={data.allContentfulService.edges}
              onChange={updateServices}
            />
          </div>
        </Container>
      </Segment>
      <Segment style={style.segment} vertical>
        <Container>
          <Card.Group centered>
            {services.map((service, index) => {
              return (
                <Card key={index}>
                  <Card.Content>
                    <Card.Header>
                      <Link to={`/services/${service.node.slug}`} key={index}>
                        {service.node.title}
                      </Link>
                    </Card.Header>
                    {service.node.tags &&
                      service.node.tags.map(tag => {
                        return (
                          <Label key={tag} size="tiny">
                            {tag}
                          </Label>
                        )
                      })}
                  </Card.Content>
                  {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                  <Card.Content extra>
                    {service.node.shortDescription.shortDescription}
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        </Container>
      </Segment>
    </Layout>
  )
}

export default Services
