import React from "react"
import styled from "styled-components"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../../richTextRendererOptions"
import Profile from "../profile"
import { Link } from "gatsby"

const CourseLeaderCard = ({ courseLeader }) => {
  return (
    <Wrapper>
      <Profile profile={courseLeader} hideReadMore />
      <ShortDescription>
        {documentToReactComponents(courseLeader.description.json, options)}
      </ShortDescription>
      <ReadMore to={`/profile/${courseLeader.slug}`}>Läs mer</ReadMore>
    </Wrapper>
  )
}

export default CourseLeaderCard

const Wrapper = styled.article`
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  padding: 15px 20px 20px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  color: var(--color-heading);
  position: relative;

  @media screen and (max-width: 600px) {
    padding-top: 40px;
  }
`

const ShortDescription = styled.div`
  color: var(--color-text);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  > p {
    overflow: hidden;
  }
`

const ReadMore = styled(Link)`
  text-decoration: underline;
`
