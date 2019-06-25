import React from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget'
import 'react-netlify-identity-widget/styles.css'
import 'semantic-ui-css/semantic.min.css'

import '../styles/main.scss'

const Layout = ({ children }) => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName"

  console.log(JSON.stringify(identity))

  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <div id="outer-container">
      {/* <button onClick={() => setDialog(true)}>
        {isLoggedIn ? `Hello ${name}` : 'Logga in'}
      </button> */}
      <Navigation />
      <main id="page-wrap">
        {children}
        <Footer />
      </main>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)}></IdentityModal>
    </div>
  )
}

export default Layout
