import React from "react"
import { Auth } from "aws-amplify"
import { Form, Button, Icon, Divider } from "semantic-ui-react"
import { useUser } from "../utils/user"

const LogIn = () => {
  if (typeof window !== "undefined") {
    var { login } = useUser()
  }

  const handleSubmit = event => {
    const username = event.target.username.value
    const password = event.target.password.value

    login(username, password)
  }
  return (
    <>
      <Divider horizontal style={{ textTransform: "none" }}>
        <Icon name="lock" /> Logga in
      </Divider>
      <Button
        fluid
        color="google plus"
        onClick={() => Auth.federatedSignIn({ provider: "Google" })}
        style={{ marginBottom: "10px" }}
      >
        <Icon name="google" /> Google
      </Button>
      <Button
        fluid
        color="facebook"
        onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
      >
        <Icon name="facebook" /> Facebook
      </Button>
      <Divider horizontal style={{ textTransform: "none" }}>
        <Icon name="mail" />
      </Divider>
      <Form
        onSubmit={event => {
          event.preventDefault()
          handleSubmit(event)
        }}
      >
        <Form.Input fluid label="E-mail" placeholder="E-mail" name="username" />
        <Form.Input
          fluid
          label="Lösenord"
          placeholder="Lösenord"
          name="password"
          type="password"
        />
        <Button
          fluid
          type="submit"
          value="Send"
          content="Logga in"
          icon="lock"
          labelPosition="left"
          positive
        />
      </Form>
    </>
  )
}

export default LogIn
