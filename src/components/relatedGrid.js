import React from "react"
import styled from "styled-components"
import CourseItem from "./courseItem"
import ArticleItem from "./articleItem"

const RelatedGrid = ({ items, title }) => {
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
      <Grid>
        {items?.map((item, i) => {
          if (getType(item) === "courses") {
            return <CourseItem key={i} course={item} />
          } else if (getType(item) === "tools") {
            return <ArticleItem key={i} article={item} />
          } else return null
        })}
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
    font-size: 32px;
    text-align: center;
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
