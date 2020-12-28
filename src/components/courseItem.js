import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { BsFillTagFill, BsBuilding } from "react-icons/bs"
import Profile from "../components/profile"
import { Tag } from "../components/styledComponents"

const CourseItem = ({ course }) => {
  console.log(course)
  return (
    <Wrapper>
      {course.courseLeaders?.map((courseLeader, i) => (
        <Profile profile={courseLeader} />
      ))}
      <Link to={`/courses/${course.slug}`}>
        <Title>{course.title}</Title>
        <ShortDescription>{course.shortDescription}</ShortDescription>
      </Link>
      <MetaWrapper>
        {course.tags?.map((tag, i) => {
          return <Tag key={i}>{tag}</Tag>
        })}
        {course.kurstillflle && (
          <Meta>
            <Date
              dateTime={course.kurstillflle[0].fullDate}
              title={`Nästa tillfälle: ${course.kurstillflle[0].fullDate}`}
            >
              <b>Nästa tillfälle:</b> {course.kurstillflle[0].shortDate}
            </Date>
            <Separator>·</Separator>
            <Price>{course.price} SEK</Price>
          </Meta>
        )}
      </MetaWrapper>
    </Wrapper>
  )
}

export default CourseItem

const Wrapper = styled.article`
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  padding: 20px 30px 15px 30px;
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

const MetaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: auto;

  > * {
    margin-bottom: 10px;
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
  margin-bottom: 25px;
`
