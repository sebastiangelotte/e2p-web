import React from "react"
import styled from "styled-components"
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"

const Share = ({ title }) => {
  const url =
    "https://www.easy2perform.se" +
    window.location.pathname +
    window.location.search

  return (
    <Wrapper>
      <TwitterShareButton url={url} title={title} hashtags={["easy2perform"]}>
        <TwitterIcon round />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title} hashtags={["easy2perform"]}>
        <FacebookIcon round />
      </FacebookShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        source={"https://www.easy2perform.se"}
      >
        <LinkedinIcon round />
      </LinkedinShareButton>
    </Wrapper>
  )
}

export default Share

const Wrapper = styled.div`
  display: flex;
  gap: 10px;

  svg {
    height: 40px;
    width: 40px;
  }
`
