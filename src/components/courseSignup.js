import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "./styledComponents"
import CheckoutButton from "../components/checkoutButton"

const CourseSignup = ({ courseDates, course }) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [otherInfo, setOtherInfo] = useState("")
  const [date, setDate] = useState(
    `${courseDates[0].city}, ${courseDates[0].title}`
  )
  const [, setIsLoading] = useState(false)
  const [message, setMessage] = useState({
    isVisible: false,
    header: "Ett meddelande",
    content: "",
    negative: false,
    positive: false,
  })

  const handleSubmit = async event => {
    setIsLoading(true)
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchParams = new URLSearchParams(formData).toString() // create URL params

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: searchParams,
      dataType: "json",
      mode: "no-cors",
    })
      .then(() => {
        setIsLoading(false)
        setMessage({
          isVisible: true,
          header: "Tack för din anmälan!",
          content: "En bekräftelse har skickats till din e-post.",
          positive: true,
        })
        document.getElementById("form-signup").reset() // reset form after submit
        setEmail("") // reset controlled form field
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  return (
    <>
      {message.isVisible ? (
        <Message>
          <h3>{message.header}</h3>
          <p>{message.content}</p>
        </Message>
      ) : (
        <Form
          id="form-signup"
          name="courseSignup"
          onSubmit={event => handleSubmit(event)}
          data-netlify="true"
        >
          {/* needed for netlify */}
          <input type="hidden" name="form-name" value="courseSignup" />
          <input type="hidden" name="Kurs" value={course.title} />
          {courseDates && (
            <Section>
              <CheckoutButton
                priceId={course.stripePriceId}
                name={course.title}
                metadata={{
                  date: date,
                  name: name,
                  email: email,
                  otherInfo: otherInfo,
                }}
              />
              {/* eslint-disable-next-line */}
              <select
                id="date"
                name="Datum"
                value={date}
                onChange={e => setDate(e.target.value)}
              >
                {courseDates.map((tillfalle, i) => (
                  <option
                    key={i}
                    value={tillfalle.date}
                  >{`${tillfalle.title}: ${tillfalle.date}`}</option>
                ))}
              </select>
            </Section>
          )}
          <Section>
            <h3>Deltagare</h3>
            <input
              type="text"
              placeholder="Namn *"
              required
              name="namn"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-post *"
              required
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Section>
          <Section>
            <h3>Övrigt</h3>
            <textarea
              placeholder="Allergier, speciella önskemål m.m."
              name="ovrigt"
              value={otherInfo}
              onChange={e => setOtherInfo(e.target.value)}
            />
            <input type="text" placeholder="Rabattkod" name="rabattkod" />
            <SubmitButton type="submit" value="Send">
              Slutför bokning *
            </SubmitButton>
            <span>* bekräftelse skickas till din e-post</span>
          </Section>
        </Form>
      )}
    </>
  )
}

export default CourseSignup

const Form = styled.form``

const Section = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 20px;
  }
`

const SubmitButton = styled(Button)`
  width: 100%;
  font-size: 20px;
`

const Message = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`
