import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import facebook from "../../images/fb.svg"

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
        <Link to="/tools">Artiklar</Link>
      </Item>
      <Item>
        <Link to="/coaching">Coaching</Link>
      </Item>
      <Item>
        <Link to="/services">Tjänster</Link>
      </Item>
      <Item>
        <a
          href="https://www.facebook.com/easy2perform/"
          target="_blank"
          rel="noreferrer"
          title="Facebook"
        >
          <img height="30" src={facebook} alt="Facebook" />
        </a>
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
  font-size: 30px;
  line-height: 60px;

  @media screen and (min-width: 900px) {
    display: none;
  }
`

const Item = styled(motion.li)`
  > a {
    color: #1e266d;
  }
`
