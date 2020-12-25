import React from "react"
import styled from "styled-components"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../../richTextRendererOptions"

const CouseLeader = ({ data }) => {
  return (
    <Wrapper>
      <CircleWrapper>
        <img src={data.image.fixed.src} alt="Profilbild" />
      </CircleWrapper>
      <div>
        <h3>{data.name}</h3>
        <Title>{data.title}</Title>
        {data.description &&
          documentToReactComponents(data.description.json, options)}
      </div>
    </Wrapper>
  )
}

export default CouseLeader

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 30px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  img {
    width: 100%;
  }
`

const CircleWrapper = styled.div`
  border-radius: 100px;
  height: 200px;
  width: 200px;
  overflow: hidden;
  margin-bottom: 10px;
`

const Title = styled.span`
  display: block;
  margin-top: -10px;
  margin-bottom: 10px;
`
