import React, { useRef } from "react"
import styled from "styled-components"
import MobileMenu from "./mobileMenu"
import DesktopMenu from "./desktopMenu"
import MenuButton from "./menuButton"
import { motion, useCycle } from "framer-motion"
import { useMeasure } from "react-use"
import Logo from "../icons/logo"
import { Link } from "gatsby"

const sidebar = {
  open: {
    opacity: 1,
    display: "block",
    transition: {
      duration: 0.3,
      type: "linear",
      // type: "spring",
      // stiffness: 20,
      // restDelta: 2,
    },
  },
  closed: {
    opacity: 0,
    display: "none",
    transition: {
      delay: 0,
      duration: 0.001,
      type: "linear",
      // stiffness: 400,
      // damping: 40,
    },
  },
}

const Navigation = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useMeasure(containerRef)

  return (
    <Wrapper
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <Inner>
        <StyledLink to="/">
          <StyledLogo />
        </StyledLink>
        <MenuButton toggle={() => toggleOpen()} />
        <MobileMenu />
        <DesktopMenu />
      </Inner>
      <Background variants={sidebar} />
    </Wrapper>
  )
}

export default Navigation

const Wrapper = styled(motion.nav)``

const Inner = styled.div`
  background: rgba(255, 255, 255, 0.25);
  height: 62px;
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 10px;
  right: 10px;
  border-radius: 16px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
  background-color: #fff;
`

const StyledLogo = styled(Logo)`
  height: 100%;
  max-height: 35px;
`

const StyledLink = styled(Link)`
  line-height: 0;
`
