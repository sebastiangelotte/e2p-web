import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"

import { API, graphqlOperation } from "aws-amplify"
import * as mutations from "../graphql/mutations"
import * as queries from "../graphql/queries"

const CourseSignup = ({ courseName, courseID }) => {
  const [extraParticipants, setExtraParticipants] = useState(0)
  const [showContactPerson, setShowContactPerson] = useState(false)
  const [email, setEmail] = useState("")
  const [formLoading, setFormLoading] = useState(false)

  const handleSubmit = async event => {
    setFormLoading(true)

    // TODO: can we loop this for all email addresses in the form?
    API.graphql(
      graphqlOperation(queries.getUserData, {
        id: email,
      })
    )
      .then(user => {
        API.graphql(
          graphqlOperation(mutations.updateUserData, {
            input: {
              id: email,
              courses: [...user.data.getUserData.courses, courseID],
            },
          })
        )
      })
      .catch(() => {
        // No existing record of this email in DynamoDB.
        // Therefore create a new UserData record
        API.graphql(
          graphqlOperation(mutations.createUserData, {
            input: {
              id: email,
              courses: [courseID],
            },
          })
        )
      })
  }

  return (
    <Form
      loading={formLoading}
      name="Kursanmälan"
      action="https://formspree.io/mpeaqozx"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="Kurs" value={courseName} />
      <input
        type="hidden"
        name="_next"
        value="https://pedantic-morse-58901e.netlify.com/"
      />
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
      {Array.apply(null, { length: extraParticipants - 1 }).map((_, index) => (
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
      ))}
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
