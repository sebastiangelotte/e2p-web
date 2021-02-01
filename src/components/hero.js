import React, { createRef, useEffect } from "react"
import styled from "styled-components"
import background from "../images/hero-bg.svg"
import { Link } from "gatsby"
import { ScaleBox } from "./scaleBox"
import lottie from "lottie-web"
import animation from "../animations/hero.json"
import { Button } from "./styledComponents"

const Hero = () => {
  const animationRef = createRef()
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animation,
      mode: "bounce",
    })
    return () => anim.destroy()
  }, [animationRef])

  return (
    <Wrapper background={background}>
      <Container>
        <Grid>
          <TextWrapper>
            <Heading>Behovsanpassade kurser - Online och På Plats!</Heading>
            <Text>
              Vi hjälper medarbetare och chefer att prestera bättre i sin
              yrkesroll. Genom behovsanpassad utbildning, individuell coaching
              och praktiska checklistor ger vi stöd i det dagliga arbetet.
            </Text>
            <ButtonWrapper>
              <Link to="/courses">
                <StyledButton secondary>Boka kurs</StyledButton>
              </Link>
            </ButtonWrapper>
          </TextWrapper>
          <ScaleBox>
            <Image ref={animationRef}></Image>
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
  grid-gap: 20px;
  padding-top: 50px;
  padding-bottom: 100px;

  @media screen and (max-width: 1023px) {
    padding-top: 40px;
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
  padding: 100px 30px 200px 30px;

  @media screen and (max-width: 700px) {
    padding: 100px 30px;
  }
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
  font-style: italic;

  @media screen and (max-width: 700px) {
    font-size: 30px;
  }
`

const Text = styled.p`
  font-size: 18px;
  max-width: 433px;
  line-height: 190%;
`

const Image = styled.div`
  max-width: 100%;
  transform: scale(1.2);

  @media screen and (max-width: 1023px) {
  }
`

const ButtonWrapper = styled.div``

const StyledButton = styled(Button)`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 10px;
  font-size: 17px;

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-bottom: 20px;
  }
`
