import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import { Segment, Container, Header, Grid } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import Filter from "../components/filter"
import Hero from "../components/hero"
import HighlightedCard from "../components/highlightedCard"
import FilterResults from "react-filter-search"
import styled from "styled-components"

const style = {
  segment: {
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
            shortDescription
            tags
            description {
              json
            }
          }
        }
      }
      highlightedTools: allContentfulTool(filter: { highlight: { eq: true } }) {
        edges {
          node {
            title
            shortDescription
            slug
            tags
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
  const [searchTerm, setSearchTerm] = useState("")

  const updateTools = tools => {
    if (tools.length > 0) {
      setTools(tools)
    } else {
      setTools(data.allContentfulTool.edges) // reset state
    }
  }

  const handleSearch = event => {
    const { value } = event.target
    setSearchTerm(value)
  }

  return (
    <Layout transparentNavigation>
      <Head title="Verktyg" />
      <Hero backgroundImage={data.file.childImageSharp.fluid}>
        <Header as="h1" inverted>
          Varför uppfinna hjulet varje gång?
        </Header>
        <div>
          <p>
            Med våra enkla, praktiska checklistor får du stöd och vägledning i
            hur vissa viktiga arbetsmoment bör utföras. Helt gratis.
          </p>
        </div>
      </Hero>
      <Container>
        <Grid stackable>
          <Grid.Row>
            {data.highlightedTools.edges.map((tool, i) => (
              <Grid.Column width={8}>
                <Segment vertical style={{ height: "100%" }}>
                  <Link to={`/tools/${tool.node.slug}`}>
                    <HighlightedCard key={i} data={tool.node} highlighted />
                  </Link>
                </Segment>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
      <Segment style={style.segment} vertical>
        <Container>
          <h2>Alla checklistor </h2>
          {/* <Filter data={data.allContentfulTool.edges} onChange={updateTools} /> */}
          <SearchBox
            type="search"
            placeholder="🔍 Sök"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Grid stackable>
            <Grid.Row>
              <FilterResults
                value={searchTerm}
                data={tools}
                renderResults={results => {
                  return results.map((el, i) => (
                    <Grid.Column width={8}>
                      <Segment vertical style={{ height: "100%" }}>
                        <Link to={`/tools/${el.node.slug}`}>
                          <HighlightedCard key={i} data={el.node} />
                        </Link>
                      </Segment>
                    </Grid.Column>
                  ))
                }}
              />
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Layout>
  )
}

export default Tools

const SearchBox = styled.input`
  display: block;
  padding: 10px 16px;
  border: 1px solid #ccc;
  margin-top: 10px;
  width: 100%;
  border-radius: 3px;
`
