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

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = event => {
    setIsLoading(true)
    event.preventDefault()
    const data = new FormData(event.target)

    fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        data,
      }),
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

  const handleMessageDismiss = () => {
    setMessage({ isVisible: false })
  }
  return (
    <Form id="form" name="contact" onSubmit={event => handleSubmit(event)}>
      {/* <input type="hidden" name="Skickat från" value={source} /> */}
      <input type="hidden" name="form-name" value="contact" />
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
