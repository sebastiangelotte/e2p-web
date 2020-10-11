import React, { useState, useEffect } from "react"
// import Navigation from "./navigation/navigation"
import Navigation from "./navigation"
import ScrollUpButton from "react-scroll-up-button"
import CookieConsent from "react-cookie-consent"
import Footer from "./footer"
import styled from "styled-components"
import { GlobalStyle } from "../globalStyle"

const Layout = ({ children, darkNavigation }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <React.Fragment key={isClient}>
      <GlobalStyle />
      <Navigation darkNavigation={darkNavigation} />
      <Main>{children}</Main>
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

const Main = styled.main`
  // min-height: 100vh;
`
