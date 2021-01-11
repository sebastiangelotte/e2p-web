import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "./styledComponents"
import { BsCheck, BsPlus } from "react-icons/bs"

const Filter = ({ items, onChange }) => {
  const [activeTags, setActiveTags] = useState([])
  let uniqueTags = new Set()

  items.forEach(item => {
    item.node.tags && item.node.tags.forEach(tag => uniqueTags.add(tag))
  })

  const updateTags = tag => {
    activeTags.includes(tag)
      ? setActiveTags(activeTags.filter(activeTag => activeTag !== tag))
      : setActiveTags([...activeTags, tag])
  }

  useEffect(() => {
    onChange(
      items.filter(item => {
        return filterByTag(item)
      })
    ) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTags])

  const filterByTag = item => {
    if (activeTags.length === 0) {
      return true // if no filter active, return all
    } else {
      return item.node.tags?.filter(tag => activeTags.includes(tag)).length > 0
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
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
`

const StyledButton = styled(Button).attrs(({ active }) => ({
  color: active ? "#fff" : "var(--color-heading)",
  backgroundColor: active ? "var(--color-heading)" : "#ffffff",
  borderColor: active ? "transparent" : "#bfc9ea",
}))`
  font-size: 14px;
  padding: 8px 20px 8px 30px;
  flex-shrink: 0;

  @media screen and (max-width: 500px) {
    width: auto;
    font-size: 13px;
    padding: 5px 15px 5px 23px;
  }
`
