import React from "react"
import Amplify from "aws-amplify"
// import awsconfig from "./src/aws-exports"

import { UserProvider } from "./src/utils/user"

const awsmobile = {
  aws_project_region: "eu-west-1",
  aws_cognito_identity_pool_id:
    "eu-west-1:4ba6d554-bd7a-4109-b4a2-92713de4582f",
  aws_cognito_region: "eu-west-1",
  aws_user_pools_id: "eu-west-1_bnHm6EKjc",
  aws_user_pools_web_client_id: "2kjrohm3hnl3h5gkj8e00bvaif",
  oauth: {
    domain: "e2p-new-default.auth.eu-west-1.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "http://localhost:8000/",
    redirectSignOut: "http://localhost:8000/",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
  aws_appsync_graphqlEndpoint:
    "https://ud4aelbvm5dsxcg2ugviokr5ey.appsync-api.eu-west-1.amazonaws.com/graphql",
  aws_appsync_region: "eu-west-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-hfr7ny2ntvckzo5yitsepoozei",
}

Amplify.configure(awsmobile)

export const wrapRootElement = ({ element }) => (
  <UserProvider>{element}</UserProvider>
)
