import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../styledComponents"

const CustomCourseContactForm = ({ heading, content, type, source }) => {
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
        <>
          {heading && <h3>{heading}</h3>}
          {content && <p>{content}</p>}
          <Form
            id="form"
            name="customCourseContactForm"
            onSubmit={event => handleSubmit(event)}
            data-netlify="true"
          >
            {/* needed for netlify */}
            <input
              type="hidden"
              name="form-name"
              value="customCourseContactForm"
            />
            <input type="hidden" name="INFO:" value={source} />
            <Section>
              <input
                type="text"
                label="Företag *"
                placeholder="Företag *"
                name="company"
                required
              />
              <input
                type="text"
                label="Namn (kontaktperson) *"
                placeholder="Namn (kontaktperson) *"
                name="namn"
                required
              />
              <input
                type="email"
                placeholder="E-post *"
                required
                name="email"
              />
              <input
                type="text"
                placeholder="Telefonnummer"
                name="phonenumber"
              />
            </Section>
            {type === "group" && (
              <Section>
                <legend>
                  <h3>Önskat upplägg</h3>
                </legend>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    name="course-format"
                    value="Halvdag på plats"
                    style={{ marginRight: "10px" }}
                  />
                  <label>Halvdag på plats</label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    name="course-format"
                    value="Halvdag digitalt"
                    style={{ marginRight: "10px" }}
                  />
                  <label>Halvdag digitalt</label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    name="course-format"
                    value="Heldag på plats"
                    style={{ marginRight: "10px" }}
                  />
                  <label>Heldag på plats</label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    name="course-format"
                    value="Annat/osäker"
                    style={{ marginRight: "10px" }}
                  />
                  <label>Annat/osäker</label>
                </div>
              </Section>
            )}

            <span>Beskriv utbildningsbehov och mål</span>
            <textarea
              placeholder="Behov, mål, annan information"
              name="Meddelande"
              rows="5"
            />
            {type === "group" && (
              <input
                type="text"
                placeholder="Uppskattat antal deltagare"
                name="participants"
              />
            )}
            <input
              type="text"
              placeholder="Önskat datum för genomförande"
              name="date"
            />
            <SubmitButton type="submit" value="Send">
              Skicka
            </SubmitButton>
          </Form>
        </>
      )}
    </>
  )
}

export default CustomCourseContactForm

const Form = styled.form`
  max-width: 480px;
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
  margin-top: 10px;
`

const Message = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`
