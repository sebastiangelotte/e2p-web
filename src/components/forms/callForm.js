import { navigate } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../styledComponents"

const CallForm = ({ course }) => {
  const [, setIsLoading] = useState(false)

  const [message, setMessage] = useState({
    isVisible: false,
    header: "Ett meddelande",
    content: "",
    negative: false,
    positive: false,
  })

  const handleSubmit = event => {
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
          header: "Förfrågan skickad!",
          content: "Vi återkommer så snart vi kan.",
          positive: true,
        })
        document.getElementById("form").reset() // reset form after submit
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
          id="form"
          name="callForm"
          onSubmit={event => handleSubmit(event)}
          data-netlify="true"
        >
          {/* needed for netlify */}
          <input type="hidden" name="form-name" value="callForm" />
          <input
            type="hidden"
            name="Skickat från"
            value={`Ring upp mig! Kurs: ${course.name}`}
          />
          <BookingDetails>
            <span>Kontaktuppgifter</span>
          </BookingDetails>
          <input type="hidden" name="form-name" value="callForm" />
          <input type="hidden" name="Skickat från" value={course.title} />
          <input type="text" placeholder="Namn *" required name="namn" />
          <input
            type="text"
            placeholder="Telefonnummer *"
            required
            name="phonenumber"
          />
          <BookingDetails>
            <span>Övrig information (valfritt)</span>
          </BookingDetails>
          <textarea
            placeholder="Övrig information, tid för samtal, etc."
            name="ovrigt"
            rows="4"
          />
          <StyledButton type="submit" value="Send">
            Bli uppringd
          </StyledButton>
        </Form>
      )}
    </>
  )
}

export default CallForm

const Form = styled.form`
  max-width: 480px;

  input[type="text"],
  input[type="email"],
  textarea {
    border-color: var(--color-text);
  }

  color: var(--color-heading);
`

const BookingDetails = styled.div`
  margin: 5px 0;
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

const Message = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`
