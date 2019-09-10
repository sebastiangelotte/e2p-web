import React, { useState } from "react"
import { Auth } from "aws-amplify"
import { Form, Button, Icon, Divider } from "semantic-ui-react"
import { useUser } from "../utils/user"

const LogIn = () => {
  if (typeof window !== "undefined") {
    var { login, createAccount, confirmAccount, resendConfirmCode } = useUser()
  }

  const [view, setView] = useState("LOGIN")
  const [tempUsername, setTempUsername] = useState() // used for confirmAccount which needs username
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = event => {
    setIsLoading(true)
    const username = event.target.username.value
    const password = event.target.password.value

    login(username, password).then(() => {
      setIsLoading(false)
    })
  }

  const handleCreateAccount = event => {
    setIsLoading(true)
    const username = event.target.username.value
    const password = event.target.password.value

    createAccount(username, password, username).then(() => {
      setTempUsername(username)
      setIsLoading(false)
      setView("CONFIRM_SIGNUP")
    })
  }

  const handleConfirmAccount = event => {
    setIsLoading(true)
    const code = event.target.code.value

    confirmAccount(tempUsername, code).then(() => {
      setIsLoading(false)
      setView("SUCCESS_CREATE_ACCOUNT")
    })
  }

  const handleResendConfirmCode = () => {
    setIsLoading(true)
    resendConfirmCode(tempUsername).then(() => {
      //
      setIsLoading(false)
    })
  }

  const LoginForm = () => {
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
            handleLogin(event)
          }}
        >
          <Form.Input
            fluid
            required
            label="E-mail"
            placeholder="E-mail"
            name="username"
            type="email"
          />
          <Form.Input
            fluid
            required
            label="Lösenord"
            placeholder="Lösenord"
            name="password"
            type="password"
          />
          <Button
            fluid
            loading={isLoading}
            type="submit"
            value="Send"
            content="Logga in"
            icon="lock"
            labelPosition="left"
            positive
            style={{ marginBottom: "30px" }}
          />
        </Form>
        <p
          style={{
            // textDecoration: "underline",
            cursor: "pointer",
            paddingLeft: "7px",
          }}
          onClick={() => setView("CREATE_ACCOUNT")}
        >
          <Icon name="plus" />
          Skapa konto
        </p>
      </>
    )
  }

  const CreateAccount = () => {
    return (
      <>
        <Divider horizontal style={{ textTransform: "none" }}>
          Nytt konto
        </Divider>
        <Form
          onSubmit={event => {
            event.preventDefault()
            handleCreateAccount(event)
          }}
        >
          <Form.Input
            fluid
            required
            label="E-mail"
            placeholder="E-mail"
            name="username"
            type="email"
          />
          <Form.Input
            fluid
            required
            label="Lösenord"
            placeholder="Lösenord"
            name="password"
            type="password"
            minLength="8"
          />
          <Button
            fluid
            loading={isLoading}
            type="submit"
            value="Send"
            content="Skapa konto"
            icon="lock"
            labelPosition="left"
            positive
            style={{ marginBottom: "30px" }}
          />
        </Form>
      </>
    )
  }

  const ConfirmSignup = () => {
    return (
      <>
        <Divider horizontal style={{ textTransform: "none" }}>
          Verifiera ditt konto
        </Divider>
        <p>En aktiveringskod har skickats till {tempUsername}</p>
        <Form
          onSubmit={event => {
            event.preventDefault()
            handleConfirmAccount(event)
          }}
        >
          <Form.Input
            fluid
            required
            label="Aktiveringskod"
            placeholder="Aktiveringskod"
            name="code"
            type="text"
          />
          <Button
            fluid
            loading={isLoading}
            type="submit"
            value="Send"
            content="Aktivera konto"
            icon="lock"
            labelPosition="left"
            positive
            style={{ marginBottom: "30px" }}
          />
        </Form>
        <Button
          basic
          color="black"
          fluid
          onClick={() => handleResendConfirmCode()}
        >
          Skicka aktiveringskoden igen
        </Button>
      </>
    )
  }

  const SuccessCreateAccount = () => {
    return (
      <>
        <Divider horizontal style={{ textTransform: "none" }}>
          Ditt konto är skapat!
        </Divider>
        <Button
          fluid
          content="Logga in"
          icon="lock"
          labelPosition="left"
          positive
          style={{ marginTop: "30px" }}
          onClick={() => setView("LOGIN")}
        />
      </>
    )
  }

  return (
    <>
      {view === "LOGIN" && <LoginForm />}
      {view === "CREATE_ACCOUNT" && <CreateAccount />}
      {view === "CONFIRM_SIGNUP" && <ConfirmSignup />}
      {view === "SUCCESS_CREATE_ACCOUNT" && <SuccessCreateAccount />}
    </>
  )
}

export default LogIn
