import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Tag } from "../components/styledComponents"

const CourseItem = ({ course }) => {
  return (
    <Wrapper>
      <Link to={`/courses/${course.slug}`}>
        <Title>{course.title}</Title>
        <ShortDescription>{course.shortDescription}</ShortDescription>
      </Link>
      <MetaWrapper>
        <TagWrapper>
          {course.tags?.map((tag, i) => {
            return <Tag key={i}>{tag}</Tag>
          })}
        </TagWrapper>
      </MetaWrapper>
    </Wrapper>
  )
}

export default CourseItem

const Wrapper = styled.article`
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  padding: 15px 20px 0 20px;
  margin-bottom: 20px;
  background-color: #fff;
  color: var(--color-heading);
  position: relative;

  @media screen and (max-width: 600px) {
    padding-top: 40px;
  }
`

const Title = styled.h3`
  font-size: 20px;
  margin-top: 0 !important;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`

const MetaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: auto;

  > * {
    margin-bottom: 5px;
  }
`

const Meta = styled.div`
  display: flex;
  gap: 5px;
  color: var(--color-text);
  margin-left: auto;
`
const Price = styled.b``

const Separator = styled.span``

const Date = styled.time``

const ShortDescription = styled.div`
  color: var(--color-text);
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const TagWrapper = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }

  > * {
    flex-shrink: 0;
  }
`
