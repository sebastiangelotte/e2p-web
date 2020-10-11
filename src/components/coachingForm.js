import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../components/new/styledComponents"

const CoachingForm = ({ source }) => {
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
          header: "Tack för ditt intresse!",
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
          name="coaching"
          onSubmit={event => handleSubmit(event)}
          data-netlify="true"
        >
          {/* needed for netlify */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="Skickat från" value={source} />
          <Section widths="equal">
            <input type="text" label="Namn" placeholder="Namn" name="namn" />
            <input type="email" placeholder="E-post *" required name="email" />
          </Section>
          <textarea
            placeholder="Dina mål, utmaningar, önskemål"
            name="Meddelande"
          />
          <SubmitButton type="submit" value="Send">
            Anmäl intresse
          </SubmitButton>
        </Form>
      )}
    </>
  )
}

export default CoachingForm

const Form = styled.form`
  max-width: 680px;
  padding-top: 20px;
`

const Section = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 20px;
  }
`

const SubmitButton = styled(Button)`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-size: 18px;
  font-weight: bold;
  padding: 18px 45px 16px 45px;
  width: 100%;
`

const Message = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`
