import React from "react"
import styled from "styled-components"
import { Container } from "semantic-ui-react"
import Img from "gatsby-image"

const Wrapper = styled.div`
  position: relative;
  max-height: 1000px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.67);
  }

  @media only screen and (max-width: 600px) {
    max-height: 600px;
    height: 800px;
  }
`

const Content = styled(Container)`
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
  padding-top: 3em;
`

const Hero = ({ children, backgroundImage }) => {
  return (
    <Wrapper>
      <Img
        fluid={backgroundImage}
        style={{ position: "static" }} // fill entire height
        objectFit="cover"
      />
      <Content text>{children}</Content>
    </Wrapper>
  )
}

export default Hero
