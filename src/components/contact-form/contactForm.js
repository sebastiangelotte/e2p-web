import React from "react"
import { Form, Input, Label, Button, Icon, TextArea } from "semantic-ui-react"

const ContactForm = () => {
  return (
    <Form name="contact" method="POST" data-netlify="true">
      <Label>
        Namn: <Input type="text" name="name" />
      </Label>
      <Label>
        Email: <Input type="email" name="email" />
      </Label>
      <Label>
        Meddelande: <TextArea name="message"></TextArea>
      </Label>
      <Button type="submit" animated>
        <Button.Content visible>Skicka</Button.Content>
        <Button.Content hidden>
          <Icon name="mail" />
        </Button.Content>
      </Button>
    </Form>
  )
}

export default ContactForm
