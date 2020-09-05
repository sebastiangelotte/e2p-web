import React, { useState } from "react"
import { Form, Button, Message } from "semantic-ui-react"

const CourseSignup = ({ courseName, courseDates }) => {
  const [extraParticipants, setExtraParticipants] = useState(0)
  const [showContactPerson, setShowContactPerson] = useState(false)
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({
    isVisible: false,
    header: "Ett meddelande",
    content: "",
    negative: false,
    positive: false,
  })

  return (
    <>
      {message.isVisible ? (
        <Message
          negative={message.negative}
          positive={message.positive}
          header={message.header}
          content={message.content}
        />
      ) : (
        <Form id="form-signup" name="Kursanmälan" data-netlify="true">
          <input type="hidden" name="Kurs" value={courseName} />
          <input
            type="hidden"
            name="_next"
            value="https://pedantic-morse-58901e.netlify.com/"
          />
          <Form.Group widths="equal">
            <select
              id="date"
              label="Datum"
              name="Datum"
              value={date}
              onBlur={e => setDate(e.target.value)}
            >
              {courseDates.map(tillfalle => (
                <option
                  value={tillfalle.date}
                >{`${tillfalle.city}: ${tillfalle.date}`}</option>
              ))}
            </select>
          </Form.Group>
          <h3>Deltagare</h3>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Namn"
              placeholder="Namn"
              required
              name="namn"
            />
            <Form.Input
              type="email"
              fluid
              label="E-post"
              placeholder="E-post"
              required
              name="email"
              value={email}
              onInput={e => setEmail(e.target.value)}
            />
          </Form.Group>
          {Array.apply(null, { length: extraParticipants - 1 }).map(
            (_, index) => (
              <Form.Group widths="equal" key={index}>
                <Form.Input
                  fluid
                  label="Namn"
                  placeholder="Namn"
                  required
                  name={`namn${index}`}
                />
                <Form.Input
                  type="email"
                  fluid
                  label="E-post"
                  placeholder="E-post"
                  required
                  name={`email${index}`}
                />
              </Form.Group>
            )
          )}
          <Button
            content="Anmäl fler deltagare"
            icon="plus"
            labelPosition="left"
            onClick={() => {
              setExtraParticipants(extraParticipants + 1)
            }}
          />
          <h3>Faktureringsinformation</h3>
          <Form.Group widths="equal">
            <Form.Input fluid label="Företag" placeholder="Företag" required />
            <Form.Input
              fluid
              label="Fakturaadress"
              placeholder="Fakturaadress"
              required
              name="fakturaadress"
            />
            <Form.Input
              fluid
              label="Postnummer"
              placeholder="Postnummer"
              required
              name="postnummer"
            />
            <Form.Input
              fluid
              label="Ort"
              placeholder="Ort"
              required
              name="ort"
            />
          </Form.Group>
          {!showContactPerson ? (
            <Button
              size="small"
              onClick={e => {
                e.preventDefault()
                setShowContactPerson(true)
              }}
            >
              Annan kontaktperson?
            </Button>
          ) : (
            <>
              <h3>Kontaktperson</h3>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Namn"
                  placeholder="Namn"
                  name="kontaktperson-namn"
                />
                <Form.Input
                  fluid
                  label="E-post"
                  placeholder="E-post"
                  name="kontaktperson-epost"
                />
                <Form.Input fluid label="Postnummer" placeholder="Postnummer" />
                <Form.Input
                  fluid
                  label="Ort"
                  placeholder="Ort"
                  name="kontaktperson-ort"
                />
              </Form.Group>
            </>
          )}

          <h3>Övrigt</h3>
          <Form.TextArea
            placeholder="Allergier, speciella önskemål m.m."
            name="ovrigt"
          />
          <Button
            loading={isLoading}
            type="submit"
            value="Send"
            content="Skicka anmälan"
            icon="send"
            labelPosition="left"
            positive
          />
        </Form>
      )}
    </>
  )
}

export default CourseSignup