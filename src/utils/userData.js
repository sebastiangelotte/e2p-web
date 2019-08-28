import { Auth, API } from "aws-amplify"

export const isLoggedIn = async () => {
  return await Auth.currentAuthenticatedUser()
    .then(() => {
      console.log(true)
      return true
    })
    .catch(() => {
      console.log(false)
      return false
    })
  //   if (Auth.currentAuthenticatedUser() !== )
}
