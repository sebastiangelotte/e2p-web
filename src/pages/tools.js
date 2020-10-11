import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Head from "../components/head"
import Layout from "../components/layout"
import FilterResults from "react-filter-search"
import styled from "styled-components"
import {
  Heading,
  SectionWithBackgroundImage,
  Section,
  Inner,
  Tag,
} from "../components/styledComponents"
import bg from "../images/hero-bg.svg"
import Card from "../components/card"

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
            createdAt(formatString: "DD MMM, YYYY")
          }
        }
      }
    }
  `)

  const [tools] = useState(data.allContentfulTool.edges)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = event => {
    const { value } = event.target
    setSearchTerm(value)
  }

  return (
    <Layout transparentNavigation>
      <Head title="Verktyg" />

      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <Heading as="h1" inverted>
            Varför uppfinna hjulet varje gång?
          </Heading>
          <p>
            Att ha en användbar checklista till hands när man skall utföra
            viktiga och svåra uppgifter i rollen som chef och ledare är
            ovärderligt. Alla våra checklistor är gratis att använda.
          </p>
        </Inner>
      </SectionWithBackgroundImage>

      <Section background>
        <Inner>
          <SearchBox
            type="search"
            placeholder="🔍 Sök"
            value={searchTerm}
            onChange={handleSearch}
          />

          <Grid>
            <FilterResults
              value={searchTerm}
              data={tools}
              renderResults={results => {
                return results.map((el, i) => (
                  <Link to={`/tools/${el.node.slug}`}>
                    <Card key={i}>
                      <CreatedAt>{el.node.createdAt}</CreatedAt>
                      <Heading as="h3">{el.node.title}</Heading>
                      {el.node.tags?.map(tag => (
                        <Tag>{tag}</Tag>
                      ))}
                    </Card>
                  </Link>
                ))
              }}
            />
          </Grid>
        </Inner>
      </Section>
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

const Grid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const CreatedAt = styled.p``
