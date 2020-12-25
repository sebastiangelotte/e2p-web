import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Profile = ({ profile }) => {
  return (
    <Wrapper>
      <CircleWrapper to={`/profile/${profile.slug}`}>
        <Image
          src={profile.image.fixed.src}
          alt="Profilbild"
          title={profile.image.title}
        />
      </CircleWrapper>
      <Details>
        <Name to={`/profile/${profile.slug}`}>{profile.name}</Name>
        <Title>{profile.title}</Title>
      </Details>
    </Wrapper>
  )
}

export default Profile

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled.img``

const Name = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`

const Title = styled.span`
  font-size: 16px;
`

const CircleWrapper = styled(Link)`
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 100px;
`
