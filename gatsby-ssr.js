import React from "react"
import { IdentityContextProvider } from "react-netlify-identity-widget"
// import "react-netlify-identity-widget/styles.css"

export const wrapRootElement = ({ element }) => (
  <IdentityContextProvider url="https://pedantic-morse-58901e.netlify.com/">
    {element}
  </IdentityContextProvider>
)
