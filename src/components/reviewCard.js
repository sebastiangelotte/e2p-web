import React from "react"
import styled from "styled-components"

const ReviewCard = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default ReviewCard

const Wrapper = styled.div`
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  padding: 45px;
  display: flex;
  flex-direction: column;

  h4 {
    color: #1e266d;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  p {
    color: #455880;
    font-size: 18px;
  }
`
