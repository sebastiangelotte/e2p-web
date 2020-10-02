import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "../components/new/styledComponents"
import { BsCheck, BsPlus } from "react-icons/bs"

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
    if (activeTags.length === 0) {
      return true // if no filter active, return all
    } else {
      return course.node.tags.filter(tag => activeTags.includes(tag)).length > 0
    }
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
            {activeTags.includes(tag) ? <BsCheck /> : <BsPlus />}
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

const StyledButton = styled(Button).attrs(({ active }) => ({
  color: active ? "#fff" : "#ff0069",
  backgroundColor: active ? "#ff0069" : "transparent",
  borderColor: active ? "transparent" : "#ff0069",
}))``
