import React, { useState, useEffect } from "react"
import { Form, Button, Icon, Divider, Message } from "semantic-ui-react"
import { useUser } from "../utils/user"

const LogIn = () => {
  if (typeof window !== "undefined") {
    var {
      login,
      createAccount,
      confirmAccount,
      resendConfirmCode,
      forgotPassword,
      forgotPasswordSubmit,
      federatedLogin,
    } = useUser()
  }

  const [view, setView] = useState("LOGIN")
  const [tempUsername, setTempUsername] = useState() // used for confirmAccount which needs username
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({
    isVisible: false,
    header: "Ett meddelande",
    content: "",
    negative: false,
    positive: false,
  })

  useEffect(() => {
    setMessage({ isVisible: false }) // Hide message when view is changed
  }, [view])

  const handleMessageDismiss = () => {
    setMessage({ isVisible: false })
  }

  const handleLogin = event => {
    setIsLoading(true)
    const username = event.target.username.value
    const password = event.target.password.value

    login(username, password)
      .then(() => {
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)

        if (err.code === "NotAuthorizedException") {
          setMessage({
            isVisible: true,
            header: "Inloggning misslyckades",
            content: "Fel användarnamn eller lösenord",
            negative: true,
          })
        }

        if (err.code === "UserNotFoundException") {
          setMessage({
            isVisible: true,
            header: "Inloggning misslyckades",
            content: "Fel användarnamn eller lösenord",
            negative: true,
          })
        }
      })
  }

  const handleForgotPasswordConfirm = event => {
    setIsLoading(true)
    const code = event.target.code.value
    const newPassword = event.target.newPassword.value

    forgotPasswordSubmit(tempUsername, code, newPassword)
      .then(() => {
        setIsLoading(false)
        setView("SUCCESS_FORGOT_PASSWORD")
      })
      .catch(err => {
        setIsLoading(false)
        if (err.code === "CodeMismatchException") {
          setMessage({
            isVisible: true,
            header: "Verifiering misslyckad",
            content: "Kontrollera att verifieringskoden är korrekt",
            negative: true,
          })
        }
      })

    setIsLoading(false)
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

    confirmAccount(tempUsername, code)
      .then(() => {
        setIsLoading(false)
        setView("SUCCESS_CREATE_ACCOUNT")
      })
      .catch(err => {
        setIsLoading(false)
        if (err.code === "CodeMismatchException") {
          setMessage({
            isVisible: true,
            header: "Verifiering misslyckad",
            content: "Kontrollera att verifieringskoden är korrekt",
            negative: true,
          })
        }
      })
  }

  const handleResendConfirmCode = () => {
    setIsLoading(true)
    resendConfirmCode(tempUsername).then(() => {
      setIsLoading(false)
    })
  }

  const handleForgotPassword = event => {
    setIsLoading(true)
    const username = event.target.username.value
    setTempUsername(username)
    forgotPassword(username)
      .then(() => {
        setIsLoading(false)
        setView("FORGOT_PASSWORD_SUBMIT")
      })
      .catch(err => {
        if (err.code === "UserNotFoundException") {
          setMessage({
            isVisible: true,
            header: "Återställning misslyckades",
            content: "Ingen användare med denna adress hittades",
            negative: true,
          })
        }
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
          onClick={() => federatedLogin("Google")}
          style={{ marginBottom: "10px" }}
        >
          <Icon name="google" /> Google
        </Button>
        <Button
          fluid
          color="facebook"
          onClick={() => federatedLogin("Facebook")}
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
        <p>
          <span
            style={{
              cursor: "pointer",
              paddingLeft: "7px",
            }}
            onClick={() => setView("CREATE_ACCOUNT")}
          >
            <Icon name="plus" />
            Skapa konto
          </span>
          <span
            style={{
              float: "right",
              cursor: "pointer",
              paddingLeft: "7px",
              fontSize: "12px",
            }}
            onClick={() => setView("FORGOT_PASSWORD")}
          >
            Glömt lösenordet?
          </span>
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

  const ForgotPassword = () => {
    return (
      <>
        <Divider horizontal style={{ textTransform: "none" }}>
          Återställ ditt lösenord
        </Divider>
        <Form
          onSubmit={event => {
            event.preventDefault()
            handleForgotPassword(event)
          }}
        >
          <Form.Input
            fluid
            required
            label="E-mail"
            placeholder="E-mail"
            name="username"
            type="text"
          />
          <Button
            fluid
            loading={isLoading}
            type="submit"
            value="Send"
            content="Bekräfta"
            icon="lock"
            labelPosition="left"
            positive
            style={{ marginBottom: "30px" }}
          />
        </Form>
      </>
    )
  }

  const ForgotPasswordSubmit = () => {
    return (
      <>
        <Divider horizontal style={{ textTransform: "none" }}>
          Återställ ditt lösenord
        </Divider>
        <Form
          onSubmit={event => {
            event.preventDefault()
            handleForgotPasswordConfirm(event)
          }}
        >
          <Form.Input
            fluid
            required
            label="Verifieringskod"
            placeholder="Verifieringskod"
            name="code"
            type="text"
          />
          <Form.Input
            fluid
            required
            label="Nytt lösenord"
            placeholder="Nytt lösenord"
            name="newPassword"
            type="password"
          />
          <Button
            fluid
            loading={isLoading}
            type="submit"
            value="Send"
            content="Verifiera"
            icon="lock"
            labelPosition="left"
            positive
            style={{ marginBottom: "30px" }}
          />
        </Form>
      </>
    )
  }

  const SuccessForgetPassword = () => {
    return (
      <>
        <Divider horizontal style={{ textTransform: "none" }}>
          Ditt lösenord är återställt!
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
      {view === "FORGOT_PASSWORD" && <ForgotPassword />}
      {view === "FORGOT_PASSWORD_SUBMIT" && <ForgotPasswordSubmit />}
      {view === "SUCCESS_FORGOT_PASSWORD" && <SuccessForgetPassword />}
      {message.isVisible && (
        <Message
          negative={message.negative}
          positive={message.positive}
          onDismiss={handleMessageDismiss}
          header={message.header}
          content={message.content}
        />
      )}
    </>
  )
}

export default LogIn
