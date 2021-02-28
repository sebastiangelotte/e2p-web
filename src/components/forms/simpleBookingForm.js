import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../styledComponents"
import { navigate } from "gatsby"

const SimpleBookingForm = ({ course, instance }) => {
  const [mainTab, setMainTab] = useState("step1")

  // Form data
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleBookingFormSubmit = async e => {
    e.preventDefault()
    await fetch("/.netlify/functions/createBooking", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        course: course.title,
        date: instance.date,
      }),
    })
    navigate(`/orderConfirmation`) // navigate to OrderConfirmation and pass order data as state
  }

  return (
    <Wrapper>
      <form
        id="booking"
        name="booking"
        onSubmit={e => handleBookingFormSubmit(e)}
      />
      <Tabs>
        <Tab active={true}>
          <span>1</span>Anmälan
        </Tab>
      </Tabs>
      <TabContent>
        <BookingDetails>
          <span>{instance.date}</span>
          <CourseDetails>
            <span>{course.title}</span>
            {Number(course.price) === 0 ? "Gratis" : `${course.price}:-`}
          </CourseDetails>
        </BookingDetails>
        <input
          type="text"
          placeholder="Namn *"
          required
          name="namn"
          value={name}
          onChange={e => setName(e.target.value)}
          form="booking"
        />
        <input
          type="email"
          placeholder="E-post *"
          required
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          form="booking"
        />
        <StyledButton type="submit" form="booking">
          Slutför bokning
        </StyledButton>
      </TabContent>
    </Wrapper>
  )
}

export default SimpleBookingForm

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
