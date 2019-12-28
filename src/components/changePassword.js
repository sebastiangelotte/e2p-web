import React, { useState } from "react"
import { Form, Button, Message } from "semantic-ui-react"
import { useUser } from "../utils/user"

const ChangePassword = () => {
  const [isLoading] = useState(false)
  const [message, setMessage] = useState({
    isVisible: false,
    header: "Ett meddelande",
    content: "",
    negative: false,
    positive: false,
  })
  //   if (typeof window !== "undefined") {
  var { user, changePassword } = useUser()
  //   }

  const handleMessageDismiss = () => {
    setMessage({ isVisible: false })
  }

  const handleChangePassword = event => {
    const oldPassword = event.target.oldPassword.value
    const newPassword = event.target.newPassword.value
    changePassword(oldPassword, newPassword)
      .then(() => {})
      .catch(err => {
        console.log(err)
        if (err.code === "NotAuthorizedException") {
          setMessage({
            isVisible: true,
            header: "Lösenordsbyte misslyckades",
            content:
              "Är du inloggad genom ett socialt nätverk så kan du inte byta lösenord.",
            negative: true,
          })
        }
        if (err.code === "LimitExceededException") {
          setMessage({
            isVisible: true,
            header: "Lösenordsbyte misslyckades",
            content: "För många försök. Försök igen om en stund.",
            negative: true,
          })
        }
      })
  }
  return (
    <>
      <Form
        onSubmit={event => {
          event.preventDefault()
          handleChangePassword(event)
        }}
      >
        <Form.Input
          fluid
          required
          disabled
          label="Användarnamn"
          value={user && user.attributes.email}
          name="username"
          type="email"
        />
        <Form.Input
          fluid
          required
          label="Gammalt lösenord"
          placeholder="Gammalt lösenord"
          name="oldPassword"
          type="password"
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
          content="Ändra lösenord"
          icon="lock"
          labelPosition="left"
          // style={{ marginBottom: "30px" }}
        />
      </Form>
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

export default ChangePassword
