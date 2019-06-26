import React from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget'
// import 'react-netlify-identity-widget/styles.css'
import 'semantic-ui-css/semantic.min.css'

const Layout = ({ children }) => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName"

  console.log(JSON.stringify(identity))

  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <>
      <Navigation />
      <main style={{minHeight: '100vh'}}>
        {children}
      </main>
      <Footer />
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)}></IdentityModal>
    </>
  )
}

export default Layout
