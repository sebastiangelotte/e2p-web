import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const DesktopMenu = () => {
  return (
    <Wrapper>
      <Item>
        <Link to="/courses">Företagsinterna kurser</Link>
        <Link to="/openCourses">Öppna kurser</Link>
        <Link to="/tools">Artiklar</Link>
        <Link to="/coaching">Coaching</Link>
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
