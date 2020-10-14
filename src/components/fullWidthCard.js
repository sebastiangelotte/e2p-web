import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import mailIcon from "../images/mail.svg"

const FullWidthCard = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <h2>Andra idéer eller krav?</h2>
        <p>
          Vi erbjuder våra kunder hjälp med ledarutveckling, framtagning av
          personalhandböcker samt individuell coaching, helt utifrån kundens
          behov.
        </p>
      </TextWrapper>
      <ButtonWrapper>
        <Link to="/contact">
          <Button>
            <img src={mailIcon} alt="Kontakta oss" /> Kontakta oss
          </Button>
        </Link>
        <p>
          Eller ta en titt på våra <Link to="/services">tjänster</Link>.
        </p>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default FullWidthCard

const Wrapper = styled.div`
  padding: 88px 113px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  max-width: 1416px;
  margin-left: auto;
  margin-right: auto;
  color: #455880;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 50px;
  align-items: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 40px 60px;
  }

  @media screen and (max-width: 400px) {
    padding: 30px 45px;
  }
`

const TextWrapper = styled.div`
  max-width: 593px;

  > h2 {
    color: #1e266d;
    font-size: 48px;
    line-height: 60px;

    @media screen and (max-width: 900px) {
      font-size: 35px;
    }
  }

  > p {
    font-size: 18px;
    line-height: 150%;
  }
`

const ButtonWrapper = styled.div`
  text-align: center;

  @media screen and (max-width: 900px) {
    text-align: left;
  }
`

const Button = styled.button`
  background-color: #0076ee;
  border-radius: 100px;
  border: none;
  color: #ffffff;
  padding: 17px 30px;
  margin-bottom: 15px;
  font-size: 18px;
  cursor: pointer;

  > img {
    margin-right: 30px;
  }
`
