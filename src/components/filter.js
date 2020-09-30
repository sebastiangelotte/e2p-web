import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "../components/new/styledComponents"

const Filter = ({ courses, onChange }) => {
  const [activeTags, setActiveTags] = useState([])
  const [activeType, setActiveType] = useState("open")
  let uniqueTags = new Set()

  courses.forEach(course => {
    course.node.tags && course.node.tags.forEach(tag => uniqueTags.add(tag))
  })

  const updateTags = tag => {
    activeTags.includes(tag)
      ? setActiveTags(activeTags.filter(activeTag => activeTag !== tag))
      : setActiveTags([...activeTags, tag])
  }

  useEffect(() => {
    onChange(
      courses.filter(course => {
        return filterByTag(course) && filterByType(course)
      })
    )
  }, [activeTags, activeType])

  const filterByTag = course => {
    return course.node.tags.filter(tag => activeTags.includes(tag)).length > 0
  }

  const filterByType = course => {
    if (activeType === "open") {
      return course.node.companyInternalCourse === false
    } else if (activeType === "companyInternal") {
      return course.node.companyInternalCourse === true
    }
  }

  return (
    <Wrapper>
      <ButtonsWrapper>
        <Text>Område:</Text>
        {Array.from(uniqueTags).map(tag => (
          <StyledButton
            key={tag}
            active={activeTags.includes(tag)}
            onClick={() => updateTags(tag)}
          >
            {tag}
          </StyledButton>
        ))}
      </ButtonsWrapper>
      <ButtonsWrapper>
        <Text>Kurstyp:</Text>
        <StyledButton
          active={activeType === "open"}
          onClick={() => setActiveType("open")}
        >
          Öppen
        </StyledButton>
        <StyledButton
          active={activeType === "companyInternal"}
          onClick={() => setActiveType("companyInternal")}
        >
          Företagsintern
        </StyledButton>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default Filter

const Wrapper = styled.div``

const Text = styled.span`
  padding-right: 20px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const StyledButton = styled(Button)`
  margin-top: 0;

  ${props =>
    props.active &&
    `
    background-color: red;
  `}
`
