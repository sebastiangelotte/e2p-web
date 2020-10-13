import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "./styledComponents"
import { BsCheck, BsPlus, BsFillPersonFill, BsBuilding } from "react-icons/bs"

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
    ) // eslint-disable-next-line react-hooks/exhaustive-deps
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
      return course.node.openCourse === true
    } else if (activeType === "companyInternal") {
      return course.node.companyInternalCourse === true
    }
  }

  return (
    <Wrapper>
      <ButtonsWrapper>
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
        <StyledButton
          active={activeType === "open"}
          onClick={() => setActiveType("open")}
        >
          <BsFillPersonFill /> Öppen
        </StyledButton>
        <StyledButton
          active={activeType === "companyInternal"}
          onClick={() => setActiveType("companyInternal")}
        >
          <BsBuilding /> Företagsintern
        </StyledButton>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default Filter

const Wrapper = styled.div``

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 500px) {
    align-items: center;
    justify-content: center;
  }
`

const StyledButton = styled(Button).attrs(({ active }) => ({
  color: active ? "#fff" : "var(--color-heading)",
  backgroundColor: active ? "var(--color-heading)" : "transparent",
  borderColor: active ? "transparent" : "#bfc9ea",
}))`
  font-size: 14px;
  padding: 8px 20px 8px 30px;

  @media screen and (max-width: 500px) {
    width: auto;
    font-size: 13px;
    padding: 5px 15px 5px 23px;
  }
`
