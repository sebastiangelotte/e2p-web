import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { BsFillTagFill, BsBuilding } from "react-icons/bs"

const CourseItem = ({ course }) => {
  return (
    <Wrapper to={`/courses/${course.slug}`}>
      <Title>{course.title}</Title>
      <ShortDescription>{course.shortDescription}</ShortDescription>
      <TagWrapper>
        {course.tags?.map(tag => {
          return (
            <span key={tag}>
              <BsFillTagFill /> {tag}
            </span>
          )
        })}
      </TagWrapper>
      <TagWrapper>
        <span>Tillgänglighet: </span>
        {course.onlineCourse && (
          <span role="img" aria-label="online">
            🟢 Online
          </span>
        )}
        {course.onSite && (
          <span>
            <BsBuilding /> On-site
          </span>
        )}
      </TagWrapper>
    </Wrapper>
  )
}

export default CourseItem

const Wrapper = styled(Link)`
  display: block;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  padding: 15px 30px;
  margin-bottom: 20px;
  background-color: #fff;
  color: var(--color-heading);
`

const Title = styled.h3`
  font-size: 20px;
  margin-top: 0 !important;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  > * {
    margin-right: 20px;
    margin-bottom: 10px;
  }
`

const ShortDescription = styled.div`
  color: var(--color-text);
  margin-bottom: 25px;
`
