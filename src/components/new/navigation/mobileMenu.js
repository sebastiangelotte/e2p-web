import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

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
      <Item>Hem</Item>
      <Item>Kurser</Item>
      <Item>Checklistor</Item>
      <Item>Tjänster</Item>
    </Wrapper>
  )
}

export default MobileMenu

const Wrapper = styled(motion.ul)`
  position: absolute;
  top: 100px;
  left: 50px;
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
