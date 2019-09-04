import React from "react"
import { Form, Button } from "semantic-ui-react"

const ContactForm = ({ source }) => {
  return (
    <Form
      name="Kontaktformulär"
      action="https://formspree.io/mrvgojgm"
      method="POST"
    >
      <input type="hidden" name="Skickat från" value={source} />
      <input
        type="hidden"
        name="_next"
        value="https://pedantic-morse-58901e.netlify.com/"
      />
      <Form.Group widths="equal">
        <Form.Input fluid label="Namn" placeholder="Namn" name="namn" />
        <Form.Input
          type="email"
          fluid
          label="E-post"
          placeholder="E-post"
          required
          name="email"
        />
        <Form.Input
          fluid
          label="Företag"
          placeholder="Företag"
          name="Företag"
        />
      </Form.Group>
      <Form.TextArea
        label="Meddelande"
        placeholder="Meddelande"
        name="Meddelande"
      />
      <Button
        type="submit"
        value="Send"
        content="Skicka"
        icon="send"
        labelPosition="left"
        positive
      />
    </Form>
  )
}

export default ContactForm
