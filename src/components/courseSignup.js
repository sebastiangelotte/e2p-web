import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"

const CourseSignup = ({ courseName }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState(1)
  const [showContactPerson, setShowContactPerson] = useState(false)

  return (
    <Form
      name="Kursanmälan"
      action="https://formspree.io/mpeaqozx"
      method="POST"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="Kursanmälan" />
      <input type="hidden" name="Kurs" value={courseName} />
      <input
        type="hidden"
        name="_next"
        value="https://pedantic-morse-58901e.netlify.com/"
      />
      <h3>Deltagare</h3>
      {Array.apply(null, { length: numberOfParticipants }).map((_, index) => (
        <Form.Group widths="equal" key={index}>
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
            name="epost"
          />
        </Form.Group>
      ))}
      <Button
        content="Lägg till deltagare"
        icon="plus"
        labelPosition="left"
        onClick={() => {
          setNumberOfParticipants(numberOfParticipants + 1)
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
        <Form.Input fluid label="Ort" placeholder="Ort" required name="ort" />
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
      <Form.Button type="submit" primary value="Send">
        Skicka anmälan
      </Form.Button>
    </Form>
  )
}

export default CourseSignup
