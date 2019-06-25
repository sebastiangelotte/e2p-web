import React from 'react'
import { Form, Input, Label, Button, Icon, TextArea } from 'semantic-ui-react'

const ContactForm = () => {
    return(
        <Form name="contact" method="POST" data-netlify="true">
            <p>
                <Label>Your Name: <Input type="text" name="name" /></Label>   
            </p>
            <p>
                <Label>Your Email: <Input type="email" name="email" /></Label>
            </p>
            <p>
                <Label>Message: <TextArea name="message"></TextArea></Label>
            </p>
            <p>
                <Button type="submit" animated>
                    <Button.Content visible>Send</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            </p>
        </Form>
    )
}

export default ContactForm
