// TODO:
// - fix bubbles in bg on small screens
import React from "react"
import styled from "styled-components"
import background from "../images/hero-bg.svg"
import image from "../images/hero-image.svg"
import { Link } from "gatsby"
import { ScaleBox } from "./scaleBox"

const Hero = () => {
  return (
    <Wrapper background={background}>
      <Container>
        <Grid>
          <TextWrapper>
            <Heading>
              Kompetensutveckling som ger stöd i det dagliga arbetet
            </Heading>
            <Text>
              Easy2perform* hjälper medarbetare och chefer att prestera bättre i
              sin yrkesroll. Genom behovsanpassad utbildning, individuell
              coaching och praktiska checklistor ger vi stöd i det dagliga
              arbetet.
            </Text>
            <ButtonWrapper>
              <Link to="/courses">
                <Button secondary>Boka kurs</Button>
              </Link>
              <Link to="/tools">
                <Button>Läs våra checklistor</Button>
              </Link>
            </ButtonWrapper>
            <SmallText>* din flexibla kursleverantör</SmallText>
          </TextWrapper>
          <ScaleBox>
            <Image src={image} />
          </ScaleBox>
        </Grid>
      </Container>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.section`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  color: #fff;
`

const TextWrapper = styled.div`
  display: grid;
  grid-gap: 50px;
  padding-top: 100px;
  padding-bottom: 100px;

  @media screen and (max-width: 1023px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }

  @media screen and (max-width: 500px) {
    grid-gap: 0;
  }
`

const Container = styled.div`
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  padding: 100px 30px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  align-items: center;

  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`

const Heading = styled.h1`
  font-size: 56px;
  line-height: 105%;

  @media screen and (max-width: 700px) {
    font-size: 30px;
  }
`

const Text = styled.p`
  font-size: 18px;
  max-width: 433px;
  line-height: 190%;
`

const SmallText = styled.p`
  font-size: 14px;
`

const Image = styled.img`
  max-width: 100%;
  transform: scale(1.2);

  @media screen and (max-width: 1023px) {
    transform: scale(4) translateX(30%) translateY(30%);
    height: 140px;
  }
`

const ButtonWrapper = styled.div``

const Button = styled.button`
  background-color: ${props => (props.secondary ? "#FF2E6A" : "#FFFFFF")};
  color: ${props => (props.secondary ? "#FFFFFF" : "#455880")};
  border-color: ${props => (props.secondary ? "#FF2E6A" : "#FFFFFF")};
  border-style: solid;
  border-radius: 200px;
  border-width: 3px;
  padding: 17px 28px;
  font-size: 16px;
  margin-right: 22px;
  cursor: pointer;
  transition: border-color 50ms ease-in;

  &:hover,
  :active,
  :focus {
    border-color: ${props => (props.secondary ? "#FFFFFF" : "#1a2653")};
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-bottom: 20px;
  }
`
