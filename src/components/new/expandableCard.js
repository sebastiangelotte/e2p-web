import React, { useState } from "react"
import styled from "styled-components"
import { BsPlusCircleFill, BsDashCircleFill } from "react-icons/bs"

const ExpandableCard = ({ heading, children, forceOpen }) => {
  const [isOpen, setIsOpen] = useState(forceOpen)

  return (
    <Wrapper>
      <Activator role="button" onClick={() => setIsOpen(!isOpen)}>
        <h3>{heading}</h3>
        {isOpen ? <BsDashCircleFill /> : <BsPlusCircleFill />}
      </Activator>
      {isOpen && <Content>{children}</Content>}
    </Wrapper>
  )
}

export default ExpandableCard

const Wrapper = styled.div`
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  margin-bottom: 20px;
  background-color: #fff;
  color: var(--color-heading);
  cursor: pointer;
`

const Content = styled.div`
  padding: 20px 30px 15px 30px;

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }

  ul {
    margin-bottom: 30px;
  }
`

const Activator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  padding: 15px 30px;

  h3 {
    margin-bottom: 0;
    font-size: inherit;
  }

  svg {
  }
`
