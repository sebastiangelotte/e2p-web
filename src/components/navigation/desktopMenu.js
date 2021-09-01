import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const DesktopMenu = () => {
  return (
    <Wrapper>
      <Item>
        <Link to="/courses">Färdiga kurspaket</Link>
        <Link to="/customCourse">Forma din egen kurs</Link>
        <Link to="/tools">Råd & Tips</Link>
        <Link to="/services">Tjänster</Link>
      </Item>
    </Wrapper>
  )
}

export default DesktopMenu

const Wrapper = styled.ul`
  list-style: none;

  @media screen and (max-width: 900px) {
    display: none;
  }
`

const Item = styled.li`
  > a {
    color: #fff;
    padding: 0 20px;
    font-weight: bold;
    font-size: 16px;
  }
`
