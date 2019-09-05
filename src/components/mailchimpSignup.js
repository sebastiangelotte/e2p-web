// https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/

import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import addToMailchimp from "gatsby-plugin-mailchimp"

const MailchimpSignup = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    addToMailchimp(email).then(data => {
      setEmail(data)
      //   console.log(data)
      //   {result: "success", msg: "Thank you for subscribing!"}
      //   {result: "error", msg: "sebastian.gelotte@gmail.com is already subscribed …02f682493a">Click here to update your profile</a>"}
    })
  }

  const handleEmailChange = event => {
    setEmail(event.currentTarget.value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        placeholder="Email address"
        name="email"
        type="email"
        onChange={handleEmailChange}
      />
      <Button
        fluid
        type="submit"
        content="Prenumerera"
        icon="send"
        labelPosition="left"
      />
    </Form>
  )
}

export default MailchimpSignup
