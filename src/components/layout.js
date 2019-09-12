import React from "react"
import Navigation from "./navigation/navigation"
import Footer from "./footer/footer"
import "semantic-ui-css/semantic.min.css"
import ScrollUpButton from "react-scroll-up-button"
import CookieConsent from "react-cookie-consent"

const Layout = ({ children, transparentNavigation }) => {
  return (
    <>
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
    </>
  )
}

export default Layout
