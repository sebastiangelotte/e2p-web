import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const Path = props => (
  <motion.path strokeWidth="3" strokeLinecap="round" stroke="#fff" {...props} />
)

const MenuButton = ({ toggle }) => {
  return (
    <Wrapper onClick={toggle}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5", stroke: "#fff" },
            open: { d: "M 3 16.5 L 17 2.5", stroke: "#1e266d" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1, stroke: "#fff" },
            open: { opacity: 0, stroke: "#1e266d" },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346", stroke: "#fff" },
            open: { d: "M 3 2.5 L 17 16.346", stroke: "#1e266d" },
          }}
        />
      </svg>
    </Wrapper>
  )
}

export default MenuButton

const Wrapper = styled.button`
  outline: none;
  border: none;
  user-select: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  z-index: 3;

  @media screen and (min-width: 900px) {
    display: none;
  }

  > svg {
    position: relative;
    top: 4px;
  }
`
