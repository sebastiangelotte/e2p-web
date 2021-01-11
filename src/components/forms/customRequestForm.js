import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../styledComponents"

const CustomRequestForm = ({ course, instance }) => {
  const [mainTab, setMainTab] = useState("step1")
  const [secondayTab, setSecondaryTab] = useState("")

  // Form data
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [otherInfo, setOtherInfo] = useState("")
  const [company, setCompany] = useState("")

  const handleSetMainTab = tab => {
    setSecondaryTab("") // close payment options
    setMainTab(tab)
  }

  const handleParticipantFormSubmit = e => {
    e.preventDefault()
    setMainTab("step2") // on successful submit, switch to nex tab
  }

  const handleCustomRequestFormSubmit = async e => {
    e.preventDefault()
  }

  return (
    <Wrapper>
      <form
        id="participant"
        name="participant"
        onSubmit={e => handleParticipantFormSubmit(e)}
      />
      <form
        id="invoice"
        name="invoice"
        onSubmit={e => handleCustomRequestFormSubmit(e)}
      />
      <Tabs>
        <Tab
          onClick={() => handleSetMainTab("step1")}
          active={mainTab === "step1"}
        >
          <span>1</span>Kontaktuppgifter
        </Tab>
        <Tab type="submit" form="participant" active={mainTab === "step2"}>
          <span>2</span>Detaljer
        </Tab>
      </Tabs>
      {mainTab === "step1" ? (
        <TabContent>
          <BookingDetails>
            <span>Kontaktuppgifter</span>
          </BookingDetails>
          <input
            type="text"
            placeholder="Namn *"
            required
            name="namn"
            value={name}
            onChange={e => setName(e.target.value)}
            form="participant"
          />
          <input
            type="email"
            placeholder="E-post *"
            required
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            form="participant"
          />
          <StyledButton type="submit" form="participant">
            Nästa steg
          </StyledButton>
        </TabContent>
      ) : (
        <TabContent>
          <BookingDetails>
            <span>
              Beskriv dina önskemål så återkommer vi med förslag på upplägg för
              kursen.
            </span>
          </BookingDetails>
          <textarea
            placeholder="Önskemål"
            name="ovrigt"
            value={otherInfo}
            onChange={e => setOtherInfo(e.target.value)}
            rows="8"
          />
          <StyledButton type="submit" form="invoice">
            Skicka förfrågan
          </StyledButton>
        </TabContent>
      )}
    </Wrapper>
  )
}

export default CustomRequestForm

const Wrapper = styled.div`
  input[type="text"],
  input[type="email"],
  textarea {
    border-color: var(--color-text);
  }

  color: var(--color-heading);
`

const Tabs = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`

const Tab = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid var(--color-heading);
  flex: 1 1 50%;
  text-align: left;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.5;
  color: var(--color-heading);
  font-weight: bold;

  > span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    font-size: 12px;
    color: #fff;
    position: relative;

    &:before {
      content: "";
      height: 20px;
      width: 20px;
      position: absolute;
      top: 1px;
      border-radius: 50%;
      background-color: var(--color-heading);
      z-index: -1;
    }
  }

  ${props =>
    props.active &&
    `
    opacity: 0.99; // weird bug where 1 makes the :before-element invisble
  `}
`

const TabContent = styled.div``

const BookingDetails = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > span {
    font-weight: bold;
  }
`

const StyledButton = styled(Button)`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 10px;
  width: 100%;
  font-size: 17px;
`
