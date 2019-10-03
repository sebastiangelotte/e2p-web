import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import { Card, Label, Segment, Container, Header } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import Filter from "../components/filter"
import Hero from "../components/hero"

const style = {
  segment: {
    paddingTop: "10em",
    paddingBottom: "6em",
    backgroundColor: "#f7f7f7",
  },
  link: {
    paddingTop: "2em",
    display: "inline-block",
  },
}

const Tools = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTool {
        edges {
          node {
            slug
            title
            tags
            description {
              json
            }
          }
        }
      }
      file(relativePath: { eq: "tools.jpg" }) {
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

  const [tools, setTools] = useState(data.allContentfulTool.edges)

  const updateTools = tools => {
    if (tools.length > 0) {
      setTools(tools)
    } else {
      setTools(data.allContentfulTool.edges) // reset state
    }
  }

  return (
    <Layout transparentNavigation>
      <Head title="Verktyg" />
      <Hero backgroundImage={data.file.childImageSharp.fluid}>
        <Header as="h1" inverted>
          Gratis checklistor och mallar
        </Header>
        <div>
          <p>
            Easy2perform utvecklar kontinuerligt praktiska checklistor och
            mallar för att ge stöd och vägledning till svåra och komplexa
            arbetsuppgifter i det dagliga arbetet. Våra enkla och effektiva
            verktyg gör det enklare för dig att prestera i yrkesrollen.
          </p>
          <Filter data={data.allContentfulTool.edges} onChange={updateTools} />
        </div>
      </Hero>
      <Segment style={style.segment} vertical>
        <Container>
          <Card.Group centered>
            {tools.map((edge, index) => {
              return (
                <Card key={index}>
                  <Card.Content>
                    <Card.Header>
                      <Link to={`/tools/${edge.node.slug}`}>
                        {edge.node.title}
                      </Link>
                    </Card.Header>
                  </Card.Content>
                  {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                  <Card.Content extra>
                    {edge.node.tags &&
                      edge.node.tags.map(tag => {
                        return (
                          <Label key={tag} size="tiny">
                            {tag}
                          </Label>
                        )
                      })}
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

export default Tools
