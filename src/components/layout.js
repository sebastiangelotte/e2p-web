import React, { useState, useEffect } from "react"
// import Navigation from "./navigation/navigation"
import Navigation from "./new/navigation"
import ScrollUpButton from "react-scroll-up-button"
import CookieConsent from "react-cookie-consent"
import Footer from "./new/footer"
import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  html, body {
    overflow-x: hidden;
  }

  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    font-family: 'Lato', Arial;
    line-height: 1.5;
  }


  h1, h2, h3, h4, h5 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }

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

  img {
    max-width: 100%;
  }

  hr {
    border: none;
    border-top: 1px solid #e8e8e8;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    text-decoration: none;
  }

  p {
    margin-bottom: 20px;
    margin-top: 0;
    max-width: 680px;
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
