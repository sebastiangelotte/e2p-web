import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Card from "./card"
import { Tag, Heading } from "./styledComponents"

const RelatedGrid = ({ items, title }) => {
  console.log(items)

  const getType = item => {
    switch (item.internal.type) {
      case "ContentfulTool":
        return "tools"
      case "ContentfulService":
        return "services"
      case "ContentfulCourse":
        return "courses"
      default:
        return ""
    }
  }

  return (
    <Wrapper>
      <h2>{title}</h2>
      <hr />
      <Grid>
        {items?.map((item, i) => (
          <Link to={`/${getType(item)}/${item.slug}`}>
            <Card key={i}>
              <CreatedAt>{item.createdAt}</CreatedAt>
              <Heading as="h3">{item.title}</Heading>
              {item.tags?.map(tag => (
                <Tag>{tag}</Tag>
              ))}
            </Card>
          </Link>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default RelatedGrid

const Wrapper = styled.div`
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;

  h2 {
    color: #1e266d;
  }
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
