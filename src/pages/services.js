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

import styled from "styled-components"

import Head from "../components/head"
import Layout from "../components/layout"
import Filter from "../components/filter"
import backgroundImage from "../images/courses.jpg"

const StyledSegment = styled(Segment)`
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.67);
  }
`

const style = {
  segment: {
    paddingTop: "10em",
    paddingBottom: "6em",
    backgroundColor: "#00000055",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
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
      <StyledSegment
        style={style.segment}
        textAlign="center"
        vertical
        // color="blue"
        inverted
      >
        <Container text style={{ position: "relative", zIndex: "1" }}>
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
      </StyledSegment>
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
