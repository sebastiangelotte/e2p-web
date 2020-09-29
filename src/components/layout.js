import React, { useState, useEffect } from "react"
// import Navigation from "./navigation/navigation"
import Navigation from "./new/navigation"
import ScrollUpButton from "react-scroll-up-button"
import CookieConsent from "react-cookie-consent"
import Footer from "./new/footer"
import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

const GlobalStyle = createGlobalStyle`
  h2 {
    font-size: 36px;
  }

  h3 {
    font-size: 30px;
  }

  ul > li > p {
      margin-bottom: 0;
  }

  ul > li > ul {
      margin-bottom: 0.75em;
  }

  .segment img {
      max-width: 100%;
  }

  .segment blockquote {
    border-left: 4px solid #7dcdea;
    padding-left: 10px;
    margin-left: 15px;
  }

  hr {
    border: none;
    border-top: 1px solid #e8e8e8;
  }
`

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
  min-height: 100vh;
`
