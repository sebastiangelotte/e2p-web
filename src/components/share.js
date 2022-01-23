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

const Share = ({ title, className, style }) => {
  const url = () => {
    if (typeof window !== "undefined") {
      return (
        "https://www.easy2perform.se" +
        window.location.pathname +
        window.location.search
      )
    } else {
      return "https://www.easy2perform.se"
    }
  }

  return (
    <Wrapper className={className} style={style}>
      <Text>Dela:</Text>
      <TwitterShareButton url={url()} title={title} hashtags={["easy2perform"]}>
        <TwitterIcon round />
      </TwitterShareButton>
      <FacebookShareButton
        url={url()}
        quote={title}
        hashtags={["easy2perform"]}
      >
        <FacebookIcon round />
      </FacebookShareButton>
      <LinkedinShareButton
        url={url()}
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
  align-items: center;
  gap: 10px;

  svg {
    height: 40px;
    width: 40px;
  }
`

const Text = styled.span`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: bold;
`
