import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "./styledComponents"

const ContactForm = ({ source }) => {
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
          header: "Meddelande skickat!",
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
          name="contact"
          onSubmit={event => handleSubmit(event)}
          data-netlify="true"
        >
          {/* needed for netlify */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="Skickat från" value={source} />
          <Section widths="equal">
            <input type="text" label="Namn" placeholder="Namn" name="namn" />
            <input type="email" placeholder="E-post *" required name="email" />
            <input type="text" placeholder="Företag" name="Företag" />
          </Section>
          <textarea placeholder="Meddelande" name="Meddelande" />
          <SubmitButton type="submit" value="Send">
            Skicka
          </SubmitButton>
        </Form>
      )}
    </>
  )
}

export default ContactForm

const Form = styled.form`
  max-width: 680px;
`

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
