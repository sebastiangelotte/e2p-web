import React from "react"

import { Authenticator } from "aws-amplify-react"
import { Greetings } from "aws-amplify-react/dist/Auth"

const LogIn = () => {
  return <Authenticator hide={[Greetings]} />
}

export default LogIn
