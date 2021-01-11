import React, { useState, useEffect } from "react"
import styled from "styled-components"
import man1 from "../images/man1.png"
import man2 from "../images/man2.jpg"
import man3 from "../images/man3.jpg"
import woman1 from "../images/woman1.png"
import woman2 from "../images/woman2.png"
import woman3 from "../images/woman3.png"

const Avatar = ({ round, preset, customImage }) => {
  const [image, setImage] = useState(customImage || man1)

  useEffect(() => {
    switch (preset) {
      case "man1":
        setImage(man1)
        break
      case "man2":
        setImage(man2)
        break
      case "man3":
        setImage(man3)
        break
      case "woman1":
        setImage(woman1)
        break
      case "woman2":
        setImage(woman2)
        break
      case "woman3":
        setImage(woman3)
        break
      default:
        break
    }
  }, [preset])

  return (
    <Wrapper round={round}>
      <img src={image} alt="avatar" />
    </Wrapper>
  )
}

export default Avatar

const Wrapper = styled.div`
  height: 50px;
  width: 50px;
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;

  ${props =>
    props.round &&
    `
  border-radius: 400px;
  overflow: hidden;
  `}

  > img {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
`
