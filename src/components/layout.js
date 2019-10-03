import React, { useState, useEffect } from "react"
import Navigation from "./navigation/navigation"
import Footer from "./footer/footer"
import ScrollUpButton from "react-scroll-up-button"
import CookieConsent from "react-cookie-consent"

import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  ul > li > p {
      margin-bottom: 0;
  }

  ul > li > ul {
      margin-bottom: 0.75em;
  }
`

const Layout = ({ children, transparentNavigation }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <React.Fragment key={isClient}>
      <GlobalStyle />
      <Navigation transparent={transparentNavigation} />
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <Footer />
      <ScrollUpButton />
      <CookieConsent
        buttonStyle={{
          backgroundColor: "#21ba45",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "10px 20px",
          borderRadius: "4px",
        }}
        buttonText="Jag förstår"
      >
        Vi använder cookies på vår hemsida för att göra ditt besök bättre.
      </CookieConsent>
    </React.Fragment>
  )
}

export default Layout
