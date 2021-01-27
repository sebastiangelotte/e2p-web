import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import decoration1 from "../images/decoration1.svg"
import decoration2 from "../images/decoration2.svg"
import decoration3 from "../images/decoration3.svg"
import decoration4 from "../images/decoration4.svg"
import { Button } from "./styledComponents"
import ArticleItem from "./articleItem"

const ImageTextSection = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTool(sort: { fields: createdAt, order: DESC }, limit: 2) {
        edges {
          node {
            slug
            title
            shortDescription
            tags
            description {
              json
              fields {
                readingTime {
                  minutes
                }
              }
            }
            shortDate: createdAt(formatString: "DD MMM")
            fullDate: createdAt(formatString: "DD MMMM YYYY")
            author {
              slug
              name
              title
              image {
                title
                fixed(width: 400) {
                  width
                  height
                  src
                }
              }
            }
          }
        }
      }
    }
  `)

  const tools = data.allContentfulTool.edges

  return (
    <Wrapper>
      <Decoration src={decoration1} alt="decoration" top={80} left={-50} />
      <Decoration src={decoration2} alt="decoration" top={300} left={-100} />
      <Decoration src={decoration3} alt="decoration" top={50} left={200} />
      <Decoration src={decoration4} alt="decoration" bottom={50} right={-48} />
      <TextWrapper>
        <h2>Senaste artiklarna</h2>
        <Grid>
          {tools.map((tool, i) => (
            <ArticleItem key={i} article={tool.node} />
          ))}
        </Grid>
      </TextWrapper>
      <Link to="/tools">
        <StyledButton>Alla artiklar »</StyledButton>
      </Link>
    </Wrapper>
  )
}

export default ImageTextSection

const Wrapper = styled.div`
  padding: 100px 0;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

const Decoration = styled.img`
  pointer-events: none;
  position: absolute;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  z-index: -1;
`

const TextWrapper = styled.div`
  z-index: 10;

  > h2 {
    font-size: 48px;
    color: #1e266d;
    text-align: center;

    @media screen and (max-width: 700px) {
      font-size: 30px;
    }
  }

  > p {
    font-size: 18px;
    line-height: 150%;
    color: #455880;
  }
`

const StyledButton = styled(Button)`
  margin-top: 50px;
`

const Grid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`
