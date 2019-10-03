import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import {
  Icon,
  Segment,
  Container,
  Header,
  Label,
  Button,
} from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import Filter from "../components/filter"
import Hero from "../components/hero"

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
      file(relativePath: { eq: "services.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 1000) {
            ...GatsbyImageSharpFluid
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
      <Hero backgroundImage={data.file.childImageSharp.fluid}>
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
      </Hero>
      <Segment vertical>
        {services.map((service, index) => {
          return (
            <Segment
              textAlign="center"
              vertical
              style={{ marginBottom: "40px", paddingBottom: "40px" }}
            >
              <Container text>
                {service.node.tags &&
                  service.node.tags.map(tag => {
                    return (
                      <Label key={tag} size="large">
                        <Icon name="tag" /> {tag}
                      </Label>
                    )
                  })}
                <Header as="h2" style={{ marginTop: "15px" }}>
                  {service.node.title}
                </Header>
                <div style={{ marginBottom: "20px" }}>
                  {service.node.shortDescription.shortDescription}
                </div>
                <Link to={`/services/${service.node.slug}`}>
                  <Button
                    positive
                    content="Läs mer"
                    icon="arrow right"
                    labelPosition="left"
                  />
                </Link>
              </Container>
            </Segment>
          )
        })}
      </Segment>
    </Layout>
  )
}

export default Services
