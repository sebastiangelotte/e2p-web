// TODO:
// - show icon on small screens somehow
import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import arrowButton from "../images/arrow-button.svg"
import cup from "../images/cup.svg"
import circle1 from "../images/circle1.svg"

const Notice = () => {
  return (
    <Link to="/courses">
      <Wrapper>
        <Icon>
          <img alt="notice" src={cup} />
        </Icon>
        <TextWrapper>
          <Heading>
            Vi firar nu vår nya hemsida - 20% rabatt på alla kurser!
          </Heading>
          <Text>
            Vi vill fira vår nya hemsida och ”look” med att ge dig som kund 20%
            rabatt på alla våra kurser. Gäller vid beställning från 15/10 -
            31/12 2020.
          </Text>
          <Text>
            Ange koden <b>AK20</b> vid anmälan.
          </Text>
        </TextWrapper>
        <Button>
          <img alt="notice" src={arrowButton} />
        </Button>
      </Wrapper>
    </Link>
  )
}

export default Notice

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 25% 1fr 20%;
  grid-gap: 20px;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  overflow: hidden;
  padding: 40px 58px;
  background-color: #ffffff;
  align-items: center;
  background-image: url(${circle1});
  background-repeat: no-repeat;
  background-position: -40px center;

  @media screen and (max-width: 650px) {
    grid-template-columns: 15% 1fr 10%;
    padding: 40px 40px;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr 20%;
  }
`

const Icon = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`

const TextWrapper = styled.div``

const Heading = styled.h3`
  color: #1e266d;
  font-size: 22px;
`

const Text = styled.p`
  color: #455880;
  font-size: 18px;
`

const Button = styled.button`
  background: none;
  border: none;
  box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.08);
  border-radius: 100px;
  justify-self: flex-end;
  padding: 0;
  height: 56px;
  width: 56px;
  cursor: pointer;
`
