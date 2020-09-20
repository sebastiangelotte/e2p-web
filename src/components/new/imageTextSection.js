import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import decoration1 from "../../images/decoration1.svg"
import decoration2 from "../../images/decoration2.svg"
import decoration3 from "../../images/decoration3.svg"
import decoration4 from "../../images/decoration4.svg"
import image from "../../images/computer.png"
import { Button } from "./styledComponents"

const ImageTextSection = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Decoration src={decoration1} alt="decoration" top={-80} left={-50} />
        <Decoration src={decoration2} alt="decoration" top={300} left={-100} />
        <Decoration src={decoration3} alt="decoration" top={-50} left={200} />
        <Decoration
          src={decoration4}
          alt="decoration"
          bottom={50}
          right={-48}
          zIndex={2}
        />
        <Image src={image} alt="Image Text Section" />
      </ImageWrapper>
      <TextWrapper>
        <h2>Varför uppfinna hjulet varje gång?</h2>
        <p>
          Med våra enkla, praktiska checklistor får du stöd och vägledning i hur
          vissa viktiga arbetsmoment bör utföras. Helt gratis.
        </p>
        <Link to="/tools">
          <Button>Till checklistorna</Button>
        </Link>
      </TextWrapper>
    </Wrapper>
  )
}

export default ImageTextSection

const Wrapper = styled.div`
  padding: 100px 0;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 100px;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;

  @media screen and (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

const ImageWrapper = styled.div`
  position: relative;
`

const Decoration = styled.img`
  pointer-events: none;
  position: absolute;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  z-index: ${props => props.zIndex};
`

const Image = styled.img`
  position: relative;
  z-index: 1;
  margin-left: auto;
  display: block;
  margin-right: auto;
  max-width: 100%;
`

const TextWrapper = styled.div`
  > h2 {
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 58px;
    color: #1e266d;
  }

  > p {
    font-size: 18px;
    line-height: 150%;
    color: #455880;
  }
`
