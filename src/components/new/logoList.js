import React from "react"
import styled from "styled-components"
import botkyrka from "../../images/botkyrka.png"
import elite from "../../images/elite.png"
import bonnier from "../../images/bonnier.png"
import samhall from "../../images/samhall.png"
import siemens from "../../images/siemens.png"
import trr from "../../images/trr.png"
import kustbevakningen from "../../images/kustbevakningen.png"

const LogoList = () => {
  return (
    <Wrapper>
      <img src={botkyrka} alt="Botkyrka Kommun" />
      <img src={elite} alt="Elite Hotels" />
      <img src={bonnier} alt="Bonnier Education" />
      <img src={samhall} alt="Samhall" />
      <img src={siemens} alt="Siemens" />
      <img src={trr} alt="TRR Trygghetsrådet" />
      <img src={kustbevakningen} alt="Kustbevakningen" />
    </Wrapper>
  )
}

export default LogoList

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 0 103px 0;

  > * {
    padding: 20px;
  }
`
