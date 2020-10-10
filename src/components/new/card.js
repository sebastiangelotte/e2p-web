import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import circle2 from "../../images/circle2.svg"

const Card = ({ link, withBackground, children, className }) => {
  return (
    <>
      {link ? (
        <Link to={link}>
          <Wrapper withBackground={withBackground} className={className}>
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
          </Wrapper>
        </Link>
      ) : (
        <Wrapper withBackground={withBackground} className={className}>
          <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </Wrapper>
      )}
    </>
  )
}

export default Card

const Wrapper = styled.div`
  padding: 58px;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  overflow: hidden;
  transition: background 100ms ease-in;
  height: 100%;
  position: relative;
  background-color: #ffffff;
  color: #1e266d;

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

    h2,
    h3,
    h4 {
      color: #ffffff;
    }

    p {
      color: #ffffff;
    }

    svg {
      fill: #ffffff;
      stroke: #ffffff;
    }
  }

  h3 {
    font-size: 28px;
    margin-bottom: 27px;
    margin-top: 0;
    color: #1e266d;
  }

  p {
    font-size: 18px;
    color: #455880;
    line-height: 27px;
  }

  svg {
    margin-bottom: 25px;
  }

  ${props =>
    props.withBackground &&
    `
    background: linear-gradient(180deg, #179afb 0%, #6c63ff 100%);

    h2, h3, h4 {
      color: #ffffff;
    }

     p {
      color: #ffffff;
    }

     svg {
      fill: #ffffff;
      stroke: #ffffff;
    }

  `}

  @media screen and (max-width: 500px) {
    padding: 20px;

    h3 {
      font-size: 22px;
    }
  }
`
