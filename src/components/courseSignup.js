import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "./styledComponents"

const CourseSignup = ({ courseName, courseDates }) => {
  const [extraParticipants, setExtraParticipants] = useState(0)
  const [showContactPerson, setShowContactPerson] = useState(false)
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
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
          <input type="hidden" name="Kurs" value={courseName} />
          {courseDates && (
            <Section>
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
            <input type="text" placeholder="Namn *" required name="namn" />
            <input
              type="email"
              placeholder="E-post *"
              required
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <MutedButton
              onClick={e => {
                e.preventDefault()
                setExtraParticipants(extraParticipants + 1)
              }}
            >
              Anmäl fler deltagare
            </MutedButton>
            {Array.apply(null, { length: extraParticipants }).map(
              (_, index) => (
                <>
                  <input
                    type="text"
                    placeholder="Namn *"
                    required
                    name={`namn${index}`}
                  />
                  <input
                    type="email"
                    placeholder="E-post *"
                    required
                    name={`email${index}`}
                  />
                </>
              )
            )}
          </Section>
          <Section>
            <h3>Faktureringsinformation</h3>
            <input type="text" placeholder="Företag *" required />
            <input
              type="text"
              placeholder="Fakturaadress *"
              required
              name="fakturaadress"
            />
            <input
              type="text"
              placeholder="Postnummer *"
              required
              name="postnummer"
            />
            <input type="text" placeholder="Ort *" required name="ort" />
            <MutedButton
              onClick={e => {
                e.preventDefault()
                setShowContactPerson(true)
              }}
            >
              Annan kontaktperson?
            </MutedButton>
          </Section>
          {showContactPerson && (
            <>
              <Section>
                <h3>Kontaktperson</h3>
                <input
                  type="text"
                  placeholder="Namn"
                  name="kontaktperson-namn"
                />
                <input
                  type="email"
                  placeholder="E-post"
                  name="kontaktperson-epost"
                />
                <input type="text" placeholder="Postnummer" />
                <input type="text" placeholder="Ort" name="kontaktperson-ort" />
              </Section>
            </>
          )}
          <Section>
            <h3>Övrigt</h3>
            <textarea
              placeholder="Allergier, speciella önskemål m.m."
              name="ovrigt"
            />
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

const MutedButton = styled(Button)`
  width: 100%;
  background-color: #1a1a1a;
  padding: 8px 10px;
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
