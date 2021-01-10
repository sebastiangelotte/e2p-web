import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../styledComponents"
import { navigate } from "gatsby"
import { BsCreditCard, BsCardText } from "react-icons/bs"
import CheckoutButton from "../checkoutButton"

const BookingForm = ({ course, instance }) => {
  const [mainTab, setMainTab] = useState("step1")
  const [secondayTab, setSecondaryTab] = useState("")

  // Form data
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [otherInfo, setOtherInfo] = useState("")
  const [company, setCompany] = useState("")
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [county, setCounty] = useState("")

  const handleSetMainTab = tab => {
    setSecondaryTab("") // close payment options
    setMainTab(tab)
  }

  const handleParticipantFormSubmit = e => {
    e.preventDefault()
    setMainTab("step2") // on successful submit, switch to nex tab
  }

  const handleInvoiceFormSubmit = async e => {
    e.preventDefault()
    await fetch("/.netlify/functions/createOrder", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        course: course.title,
        date: instance.date,
        paymentMethod: "Invoice",
        company,
        address,
        zipCode,
        county,
      }),
    })
    navigate(`/orderConfirmation`) // navigate to OrderConfirmation and pass order data as state
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
        onSubmit={e => handleInvoiceFormSubmit(e)}
      />
      <Tabs>
        <Tab
          onClick={() => handleSetMainTab("step1")}
          active={mainTab === "step1"}
        >
          <span>1</span>Deltagare
        </Tab>
        <Tab type="submit" form="participant" active={mainTab === "step2"}>
          <span>2</span>Betalning
        </Tab>
      </Tabs>
      {mainTab === "step1" ? (
        <TabContent>
          <BookingDetails>
            <span>{instance.date}</span>
            <CourseDetails>
              <span>{course.title}</span>
              <span>{course.price}:-</span>
            </CourseDetails>
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
            <span>{instance.date}</span>
            <CourseDetails>
              <span>{course.title}</span>
              <span>{course.price}:-</span>
            </CourseDetails>
            <span>
              {name} ({email})
            </span>
          </BookingDetails>
          <textarea
            placeholder="Allergier, speciella önskemål m.m."
            name="ovrigt"
            value={otherInfo}
            onChange={e => setOtherInfo(e.target.value)}
          />
          <Tabs>
            {course.stripePriceId && (
              <PaymentOption
                onClick={() => setSecondaryTab("card")}
                active={secondayTab === "card"}
              >
                <BsCreditCard />
                Kortbetalning
              </PaymentOption>
            )}
            <PaymentOption
              onClick={() => setSecondaryTab("invoice")}
              active={secondayTab === "invoice"}
            >
              <BsCardText />
              Faktura
            </PaymentOption>
          </Tabs>
        </TabContent>
      )}
      {secondayTab === "card" && (
        <TabContent>
          <CheckoutButton
            priceId={course.stripePriceId}
            name={course.title}
            metadata={{
              date: instance.date,
              name: name,
              email: email,
              otherInfo: otherInfo,
              course: course.title,
              paymentMethod: "Card",
            }}
          >
            Till kortbetalning
          </CheckoutButton>
        </TabContent>
      )}
      {secondayTab === "invoice" && (
        <TabContent>
          <input
            type="text"
            name="företag"
            placeholder="Företag *"
            value={company}
            onChange={e => setCompany(e.target.value)}
            form="invoice"
            required
          />
          <input
            type="text"
            name="adress"
            placeholder="Fakturaadress *"
            value={address}
            onChange={e => setAddress(e.target.value)}
            form="invoice"
            required
          />
          <input
            type="text"
            name="postnummer"
            placeholder="Postnummer *"
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            form="invoice"
            required
          />
          <input
            type="text"
            name="ort"
            placeholder="Ort *"
            value={county}
            onChange={e => setCounty(e.target.value)}
            form="invoice"
            required
          />
          <StyledButton type="submit" form="invoice">
            Slutför bokning
          </StyledButton>
        </TabContent>
      )}
    </Wrapper>
  )
}

export default BookingForm

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

const PaymentOption = styled.button`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-text);
  text-align: center;
  flex: 1 1 50%;
  border-radius: 6px;
  background: #fff;
  color: var(--color-heading);
  cursor: pointer;

  > svg {
    font-size: 30px;
  }

  ${props =>
    props.active &&
    `
    background-color: var(--color-heading);
    color: #fff;
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

const CourseDetails = styled.div`
  display: flex;
  gap: 20px;
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
