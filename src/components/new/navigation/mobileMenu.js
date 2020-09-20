import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link } from "gatsby"

const variants = {
  open: {
    display: "block",
    opacity: 1,
  },
  closed: {
    display: "none",
    opacity: 0,
  },
}

const MobileMenu = () => {
  return (
    <Wrapper variants={variants}>
      <Item>
        <Link to="/">Hem</Link>
      </Item>
      <Item>
        <Link to="/courses">Kurser</Link>
      </Item>
      <Item>
        <Link to="/tools">Checklistor</Link>
      </Item>
      <Item>
        <Link to="/services">Tjänster</Link>
      </Item>
      <Item>
        <Link to="/contact">Kontakta oss</Link>
      </Item>
    </Wrapper>
  )
}

export default MobileMenu

const Wrapper = styled(motion.ul)`
  position: absolute;
  top: 100px;
  left: 30px;
  z-index: 3;
  list-style: none;
  padding-left: 0;
  font-size: 40px;
  line-height: 60px;

  @media screen and (min-width: 900px) {
    display: none;
  }
`

const Item = styled(motion.li)``
