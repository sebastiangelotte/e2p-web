import React from "react"

import { Authenticator } from "aws-amplify-react"

import Layout from "../components/layout"
import { Greetings } from "aws-amplify-react/dist/Auth"

const LogIn = () => {
  return (
    <Layout>
      <Authenticator hide={[Greetings]} />
    </Layout>
  )
}

export default LogIn
