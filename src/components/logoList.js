import React from "react"
import styled from "styled-components"
import botkyrka from "../images/botkyrka.png"
import elite from "../images/elite.png"
import bonnier from "../images/bonnier.png"
import samhall from "../images/samhall.png"
import siemens from "../images/siemens.png"
import trr from "../images/trr.png"
import kustbevakningen from "../images/kustbevakningen.png"
import eg from "../images/eg.png"
import securelink from "../images/securelink.png"
import varakommun from "../images/varakommun.png"

const LogoList = () => {
  return (
    <Wrapper>
      <img src={botkyrka} alt="Botkyrka Kommun" />
      <img src={elite} alt="Elite Hotels" />
      {/* <img src={bonnier} alt="Bonnier Education" /> */}
      <img src={samhall} alt="Samhall" />
      {/* <img src={siemens} alt="Siemens" /> */}
      <img src={trr} alt="TRR Trygghetsrådet" />
      <img src={kustbevakningen} alt="Kustbevakningen" />
      <img src={eg} alt="EG" />
      <img src={securelink} alt="Securelink" />
      <img src={varakommun} alt="Vara Kommun" />
    </Wrapper>
  )
}

export default LogoList

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 0 103px 0;
  width: 100%;

  > * {
    padding: 20px;
  }

  @media screen and (max-width: 1100px) {
    text-align: center;
    display: block;
  }
`
