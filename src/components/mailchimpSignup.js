// https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/

import React, { useState } from "react"
import { Form, Button, Message } from "semantic-ui-react"
import addToMailchimp from "gatsby-plugin-mailchimp"

const MailchimpSignup = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
    addToMailchimp(email).then(data => {
      setIsLoading(false)
      setEmail(data)

      if (data.result === "success") {
        setMessage({
          isVisible: true,
          header: "Tack för din prenumeration!",
          content: "",
          positive: true,
        })
      } else if (data.result === "error") {
        setMessage({
          isVisible: true,
          header: "Fel vid prenumeration.",
          content: "Du prenumererar redan på detta nyhetsbrev.",
          negative: true,
        })
      }

      document.getElementById("form-newsletter").reset() // reset form after submit
    })
  }

  const handleEmailChange = event => {
    setEmail(event.currentTarget.value)
  }

  const handleMessageDismiss = () => {
    setMessage({ isVisible: false })
  }

  return (
    <Form id="form-newsletter" onSubmit={handleSubmit}>
      <Form.Input
        placeholder="Email address"
        name="email"
        type="email"
        onChange={handleEmailChange}
      />
      <Button
        loading={isLoading}
        fluid
        type="submit"
        content="Prenumerera"
        icon="send"
        labelPosition="left"
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

export default MailchimpSignup
