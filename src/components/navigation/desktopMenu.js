import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const DesktopMenu = () => {
  return (
    <Wrapper>
      <Item>
        <Link to="/courses">Kurser</Link>
        <Link to="/coaching">Coaching</Link>
        <Link to="/tools">Artiklar</Link>
        <Link to="/services">Tjänster</Link>
        <Link to="/contact">Kontakt</Link>
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
