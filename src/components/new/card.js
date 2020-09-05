import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import circle2 from "../../images/circle2.svg"

const Card = ({ link, children }) => {
  return (
    <Link to={link}>
      <Wrapper>{children}</Wrapper>
    </Link>
  )
}

export default Card

const Wrapper = styled.div`
  padding: 58px;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.08),
    0px 14px 25px rgba(135, 146, 161, 0.06);
  border-radius: 18px;
  overflow: hidden;
  transition: background 100ms ease-in;
  height: 100%;
  cursor: pointer;
  position: relative;
  background-color: #ffffff;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(${circle2});
    background-repeat: no-repeat;
    background-position: bottom right;
  }

  &:hover,
  &:active,
  &:focus {
    background: linear-gradient(180deg, #179afb 0%, #6c63ff 100%);

    > h3 {
      color: #ffffff;
    }

    > p {
      color: #ffffff;
    }

    > svg {
      fill: #ffffff;
      stroke: #ffffff;
    }
  }

  > h3 {
    font-size: 28px;
    margin-bottom: 27px;
    margin-top: 0;
    color: #1e266d;
  }

  > p {
    font-size: 18px;
    color: #455880;
    line-height: 27px;
  }

  > svg {
    margin-bottom: 45px;
  }
`