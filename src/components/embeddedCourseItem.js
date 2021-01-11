import React from "react"
import styled from "styled-components"
import Card from "../components/card"
import { Button, Heading } from "../components/styledComponents"

const EmbeddedCourseItem = ({ course }) => {
  return (
    <StyledCard
      withBackground
      link={`/courses/${course.slug}`}
      title={course.title}
    >
      <TextWrapper>
        <Type>Rekommenderad kurs</Type>
        <Heading as="h3" inverted>
          {course.title}
        </Heading>
      </TextWrapper>
      <StyledButton>Läs mer</StyledButton>
    </StyledCard>
  )
}

export default EmbeddedCourseItem

const Type = styled.span`
  color: #fff;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
`

const StyledCard = styled(Card)`
  padding: 20px 30px 30px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  gap: 10px;
  margin: 20px 0;
  text-align: left;

  h3 {
    margin-bottom: 0px;
    margin-top: 5px;
  }

  @media screen and (max-width: 680px) {
    flex-direction: column;
  }
`

const TextWrapper = styled.div``

const StyledButton = styled(Button)`
  margin: auto;
  margin-bottom: 0;
  margin-right: 0;
  flex-shrink: 0;
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 45px 11px 45px;
`
