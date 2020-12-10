import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

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
  Button,
} from "../components/styledComponents"
import bg from "../images/hero-bg.svg"
import Card from "../components/card"
import { BsArrowRightShort } from "react-icons/bs"

const Tools = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTool(sort: { fields: createdAt, order: DESC }) {
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
                  <Card link={`/tools/${el.node.slug}`} key={i}>
                    <CreatedAt>{el.node.createdAt}</CreatedAt>
                    <Heading as="h3">{el.node.title}</Heading>
                    <TagsWrapper>
                      {el.node.tags?.map(tag => (
                        <Tag>{tag}</Tag>
                      ))}
                    </TagsWrapper>
                    <p>{el.node.shortDescription}</p>
                    <StyledButton>
                      Läs mer <BsArrowRightShort />
                    </StyledButton>
                  </Card>
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
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 7px;
  border: none;
  margin-top: 10px;
  width: 100%;
`

const Grid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;

  @media screen and (max-width: 1230px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const CreatedAt = styled.p``

const StyledButton = styled(Button)`
  margin-top: auto;
  font-size: 16px;
  padding: 8px 10px 8px 20px;
  border-radius: 7px;

  > svg {
    margin: 0;
    margin-left: 7px;
  }
`

const TagsWrapper = styled.div`
  margin-top: -15px;
`
