import React from "react"
import Navigation from "./navigation/navigation"
import Footer from "./footer/footer"
import "semantic-ui-css/semantic.min.css"
import ScrollUpButton from "react-scroll-up-button"
import CookieConsent from "react-cookie-consent"
// import { Hub } from "aws-amplify"

const Layout = ({ children, transparentNavigation }) => {
  //   const [authState, setAuthState] = useState()
  //   useEffect(() => {
  //     Hub.listen("auth", data => {
  //       const { payload } = data
  //       console.log("A new auth event has happened: ", data)
  //       if (payload.event === "signIn") {
  //         console.log("a user has signed in!")
  //         setAuthState(true)
  //       }
  //       if (payload.event === "signOut") {
  //         console.log("a user has signed out!")
  //         setAuthState(false)
  //       }
  //     })
  //   }, [authState])
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
