import React, { useState } from "react"
import { Form, Button, Message } from "semantic-ui-react"

const ContactForm = ({ source }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({
    isVisible: false,
    header: "Ett meddelande",
    content: "",
    negative: false,
    positive: false,
  })

  const handleMessageDismiss = () => {
    setMessage({ isVisible: false })
  }
  return (
    <Form id="form" name="Kontaktformulär" data-netlify="true">
      <input type="hidden" name="Skickat från" value={source} />
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
        loading={isLoading}
      />
      {message.isVisible && (
        <Message
          negative={message.negative}
          positive={message.positive}
          onDismiss={handleMessageDismiss}
          header={message.header}
          content={message.content}
        />
      )}
    </Form>
  )
}

export default ContactForm
