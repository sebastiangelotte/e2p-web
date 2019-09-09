// import React, { useEffect, useState } from "react"
// import { Auth, API, graphqlOperation } from "aws-amplify"
// import * as queries from "../graphql/queries"
// import * as mutations from "../graphql/mutations"

// import { isLoggedIn } from "../utils/user"

// const AuthTesting = () => {
//   const [loggedIn, setLoggedIn] = useState(false)
//   useEffect(() => {
//     const checkLoggedIn = async () => {
//       setLoggedIn(await isLoggedIn())
//     }
//     checkLoggedIn()
//   }, [])

//   Auth.currentAuthenticatedUser({
//     bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
//   })
//     .then(user => console.log(user))
//     .catch(err => console.log(err))

//   return (
//     <div>
//       <button onClick={() => Auth.federatedSignIn()}>Log in</button>
//       <button
//         onClick={async () => {
//           const allUsers = await API.graphql(
//             graphqlOperation(queries.listUserDatas)
//           )
//           console.log(allUsers)
//         }}
//       >
//         List users
//       </button>
//       <button
//         onClick={async () => {
//           const newUser = await API.graphql(
//             graphqlOperation(mutations.updateUserData, {
//               input: {
//                 id: "asd",
//                 courses: ["333"],
//               },
//             })
//           )
//           console.log(newUser)
//         }}
//       >
//         Add user
//       </button>
//       <span>Is logged in? {loggedIn === true ? "YES" : "NO"}</span>
//     </div>
//   )
// }

// export default AuthTesting
