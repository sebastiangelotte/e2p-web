import React from "react"
import Navigation from "./navigation/navigation"
import Footer from "./footer/footer"
import "semantic-ui-css/semantic.min.css"

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
